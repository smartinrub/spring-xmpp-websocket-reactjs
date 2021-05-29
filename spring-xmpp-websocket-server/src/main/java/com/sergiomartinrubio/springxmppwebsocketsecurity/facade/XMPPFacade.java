package com.sergiomartinrubio.springxmppwebsocketsecurity.facade;

import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPGenericException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.WebsocketMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.service.AccountService;
import com.sergiomartinrubio.springxmppwebsocketsecurity.utils.BCryptUtils;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.WebSocketTextMessageHelper;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.packet.Presence;
import org.jivesoftware.smack.roster.Roster;
import org.jivesoftware.smack.roster.RosterEntry;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Component;

import javax.websocket.Session;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.ERROR;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.FORBIDDEN;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.GET_CONTACTS;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.JOIN_SUCCESS;

@Slf4j
@Component
@RequiredArgsConstructor
public class XMPPFacade {

    // TODO: save user
    private static final Map<Session, XMPPTCPConnection> CONNECTIONS = new HashMap<>();

    private final AccountService accountService;
    private final WebSocketTextMessageHelper webSocketTextMessageHelper;
    private final XMPPClient xmppClient;

    public void startSession(Session session, String username, String password) {
        Optional<Account> account = accountService.getAccount(username);

        if (account.isPresent() && !BCryptUtils.isMatch(password, account.get().getPassword())) {
            log.warn("Invalid password for user {}.", username);
            webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(FORBIDDEN).build());
            return;
        }

        Optional<XMPPTCPConnection> connection = xmppClient.connect(username, password);

        if (connection.isEmpty()) {
            webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(ERROR).build());
            return;
        }

        try {
            if (account.isEmpty()) {
                xmppClient.createAccount(connection.get(), username, password);
            }
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
            case GET_CONTACTS -> {
                Set<RosterEntry> contacts = Set.of();
                try {
                    contacts = xmppClient.getContacts(connection);
                } catch (XMPPGenericException e) {
                    handleXMPPGenericException(session, connection, e);
                }

                JSONObject json = new JSONObject();
                for (RosterEntry entry : contacts) {
                    try {
                        json.put("name", entry.getName());
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                WebsocketMessage responseMessage = WebsocketMessage.builder()
                        .content(json.toString())
                        .messageType(GET_CONTACTS)
                        .build();
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

    private void handleXMPPGenericException(Session session, XMPPTCPConnection connection, XMPPGenericException e) {
        log.error("XMPP error. Disconnecting and removing session...", e);
        xmppClient.disconnect(connection);
        webSocketTextMessageHelper.send(session, WebsocketMessage.builder().messageType(ERROR).build());
        CONNECTIONS.remove(session);
    }
}
