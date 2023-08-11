package com.sergiomartinrubio.springxmppwebsocketsecurity.facade;

import com.google.gson.JsonArray;
import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPGenericException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.WebsocketMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.service.AccountService;
import com.sergiomartinrubio.springxmppwebsocketsecurity.utils.BCryptUtils;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.WebSocketTextMessageHelper;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPClient;
import jakarta.websocket.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.packet.Presence;
import org.jivesoftware.smack.roster.RosterEntry;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class XMPPFacade {

    private static final Map<Session, XMPPTCPConnection> CONNECTIONS = new HashMap<>();

    private final AccountService accountService;
    private final WebSocketTextMessageHelper webSocketTextMessageHelper;
    private final XMPPClient xmppClient;

    public void startSession(Session session, String username, String password) {
        // TODO: Save user session to avoid having to login again when the websocket connection is closed
        //      1. Generate token
        //      2. Save username and token in Redis
        //      3. Return token to client and store it in a cookie or local storage
        //      4. When starting a websocket session check if the token is still valid and bypass XMPP authentication
        Optional<Account> account = accountService.getAccount(username);

        if (account.isPresent() && !BCryptUtils.isMatch(password, account.get().getPassword())) {
            log.warn("Invalid password for user {}.", username);
            webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(FORBIDDEN).build());
            return;
        }

        Optional<XMPPTCPConnection> connection = xmppClient.connect(username, password);

        if (connection.isEmpty()) {
            log.info("XMPP connection was not established. Closing websocket session...");
            webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(ERROR).build());
            try {
                session.close();
                return;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        try {
            if (account.isEmpty()) {
                log.info("Creating new account.");
                xmppClient.createAccount(connection.get(), username, password);
                log.info("Account created.");
            }
            log.info("Login into account.");
            xmppClient.login(connection.get());
        } catch (XMPPGenericException e) {
            handleXMPPGenericException(session, connection.get(), e);
            return;
        }

        CONNECTIONS.put(session, connection.get());
        log.info("Session was stored.");

        xmppClient.addIncomingMessageListener(connection.get(), session);

        webSocketTextMessageHelper.send(session, WebsocketMessage.builder().to(username).messageType(JOIN_SUCCESS).build());
    }

    public void sendMessage(WebsocketMessage message, Session session) {
        XMPPTCPConnection connection = CONNECTIONS.get(session);

        if (connection == null) {
            return;
        }

        switch (message.getMessageType()) {
            case NEW_MESSAGE -> {
                try {
                    xmppClient.sendMessage(connection, message.getContent(), message.getTo());
                    // TODO: save message for both users in DB
                } catch (XMPPGenericException e) {
                    handleXMPPGenericException(session, connection, e);
                }
            }
            case ADD_CONTACT -> {
                try {
                    xmppClient.addContact(connection, message.getTo());
                } catch (XMPPGenericException e) {
                    handleXMPPGenericException(session, connection, e);
                }
            }
            case UNSUBSCRIBE -> {
                try {
                    xmppClient.remove(connection, message.getTo());
                } catch (XMPPGenericException e) {
                    handleXMPPGenericException(session, connection, e);
                }
            }
            case GET_CONTACTS -> {
                Set<RosterEntry> contacts = Set.of();
                try {
                    contacts = xmppClient.getContacts(connection);
                } catch (XMPPGenericException e) {
                    handleXMPPGenericException(session, connection, e);
                }

                JsonArray jsonArray = new JsonArray();
                for (RosterEntry entry : contacts) {
                    jsonArray.add(entry.getName());
                }
                WebsocketMessage responseMessage = WebsocketMessage.builder()
                        .content(jsonArray.toString())
                        .messageType(GET_CONTACTS)
                        .build();
                log.info("Returning list of contacts {} for user {}.", jsonArray, connection.getUser());
                webSocketTextMessageHelper.send(session, responseMessage);
            }
            default -> log.warn("Message type not implemented.");
        }
    }

    public void disconnect(Session session) {
        XMPPTCPConnection connection = CONNECTIONS.get(session);

        if (connection == null) {
            return;
        }

        try {
            xmppClient.sendStanza(connection, Presence.Type.unavailable);
        } catch (XMPPGenericException e) {
            log.error("XMPP error.", e);
            webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(ERROR).build());
        }

        xmppClient.disconnect(connection);
        CONNECTIONS.remove(session);
    }

    private void handleXMPPGenericException(Session session, XMPPTCPConnection connection, Exception e) {
        log.error("XMPP error. Disconnecting and removing session...", e);
        xmppClient.disconnect(connection);
        webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(ERROR).build());
        CONNECTIONS.remove(session);
    }
}
