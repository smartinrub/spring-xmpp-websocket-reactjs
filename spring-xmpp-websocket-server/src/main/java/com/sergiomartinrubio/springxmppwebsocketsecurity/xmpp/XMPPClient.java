package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPGenericException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import com.sergiomartinrubio.springxmppwebsocketsecurity.service.AccountService;
import com.sergiomartinrubio.springxmppwebsocketsecurity.utils.BCryptUtils;
import jakarta.websocket.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.ChatManager;
import org.jivesoftware.smack.packet.Presence;
import org.jivesoftware.smack.packet.PresenceBuilder;
import org.jivesoftware.smack.roster.Roster;
import org.jivesoftware.smack.roster.RosterEntry;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.jivesoftware.smackx.iqregister.AccountManager;
import org.jxmpp.jid.BareJid;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.EntityFullJid;
import org.jxmpp.jid.impl.JidCreate;
import org.jxmpp.jid.parts.Localpart;
import org.jxmpp.stringprep.XmppStringprepException;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
@EnableConfigurationProperties(XMPPProperties.class)
public class XMPPClient {

    private final XMPPProperties xmppProperties;
    private final AccountService accountService;
    private final XMPPMessageTransmitter xmppMessageTransmitter;

    public Optional<XMPPTCPConnection> connect(String username, String plainTextPassword) {
        XMPPTCPConnection connection;
        try {
            EntityBareJid entityBareJid;
            entityBareJid = JidCreate.entityBareFrom(username + "@" + xmppProperties.getDomain());
            XMPPTCPConnectionConfiguration config = XMPPTCPConnectionConfiguration.builder()
                    .setHost(xmppProperties.getHost())
                    .setPort(xmppProperties.getPort())
                    .setXmppDomain(xmppProperties.getDomain())
                    .setUsernameAndPassword(entityBareJid.getLocalpart(), plainTextPassword)
                    .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                    .setResource(entityBareJid.getResourceOrEmpty())
                    .setSendPresence(true)
                    .build();

            connection = new XMPPTCPConnection(config);
            connection.connect();
        } catch (SmackException | IOException | XMPPException | InterruptedException e) {
            log.info("Could not connect to XMPP server.", e);
            return Optional.empty();
        }
        return Optional.of(connection);
    }

    public void createAccount(XMPPTCPConnection connection, String username, String plainTextPassword) {
        AccountManager accountManager = AccountManager.getInstance(connection);
        accountManager.sensitiveOperationOverInsecureConnection(true);
        try {
            accountManager.createAccount(Localpart.from(username), plainTextPassword);
        } catch (SmackException.NoResponseException |
                XMPPException.XMPPErrorException |
                SmackException.NotConnectedException |
                InterruptedException |
                XmppStringprepException e) {
            throw new XMPPGenericException(username, e);
        }

        accountService.saveAccount(new Account(username, BCryptUtils.hash(plainTextPassword)));
        log.info("Account for user '{}' created.", username);
    }

    public void login(XMPPTCPConnection connection) {
        try {
            connection.login();
        } catch (XMPPException | SmackException | IOException | InterruptedException e) {
            log.error("Login to XMPP server with user {} failed.", connection.getUser(), e);

            EntityFullJid user = connection.getUser();
            throw new XMPPGenericException(user == null ? "unknown" : user.toString(), e);
        }
        log.info("User '{}' logged in.", connection.getUser());
    }

    public void addIncomingMessageListener(XMPPTCPConnection connection, Session webSocketSession) {
        ChatManager chatManager = ChatManager.getInstanceFor(connection);
        chatManager.addIncomingListener((from, message, chat) -> xmppMessageTransmitter
                .sendResponse(message, webSocketSession));
        log.info("Incoming message listener for user '{}' added.", connection.getUser());
    }

    public void sendMessage(XMPPTCPConnection connection, String message, String to) {
        ChatManager chatManager = ChatManager.getInstanceFor(connection);
        try {
            Chat chat = chatManager.chatWith(JidCreate.entityBareFrom(to + "@" + xmppProperties.getDomain()));
            chat.send(message);
            log.info("Message sent to user '{}' from user '{}'.", to, connection.getUser());
        } catch (XmppStringprepException | SmackException.NotConnectedException | InterruptedException e) {
            throw new XMPPGenericException(connection.getUser().toString(), e);
        }
    }

    public void addContact(XMPPTCPConnection connection, String to) {
        Roster roster = Roster.getInstanceFor(connection);

        if (!roster.isLoaded()) {
            try {
                roster.reloadAndWait();
            } catch (SmackException.NotLoggedInException | SmackException.NotConnectedException | InterruptedException e) {
                log.error("XMPP error. Disconnecting and removing session...", e);
                throw new XMPPGenericException(connection.getUser().toString(), e);
            }
        }

        try {
            BareJid contact = JidCreate.bareFrom(to + "@" + xmppProperties.getDomain());
            roster.createItemAndRequestSubscription(contact, to, null);
            log.info("Contact '{}' added to user '{}'.", to, connection.getUser());
        } catch (XmppStringprepException | XMPPException.XMPPErrorException
                | SmackException.NotConnectedException | SmackException.NoResponseException
                | SmackException.NotLoggedInException | InterruptedException e) {
            log.error("XMPP error. Disconnecting and removing session...", e);
            throw new XMPPGenericException(connection.getUser().toString(), e);
        }
    }

    public void remove(XMPPTCPConnection connection, String to) {
        Roster roster = Roster.getInstanceFor(connection);

        if (!roster.isLoaded()) {
            try {
                roster.reloadAndWait();
            } catch (SmackException.NotLoggedInException | SmackException.NotConnectedException | InterruptedException e) {
                log.error("XMPP error. Disconnecting and removing session...", e);
                throw new XMPPGenericException(connection.getUser().toString(), e);
            }
        }

        try {
            BareJid contact = JidCreate.bareFrom(to + "@" + xmppProperties.getDomain());
            roster.removeEntry(roster.getEntry(contact));
            log.info("User '{}' removed contact '{}'.", connection.getUser(), to);
        } catch (XmppStringprepException | XMPPException.XMPPErrorException
                 | SmackException.NotConnectedException | SmackException.NoResponseException
                 | SmackException.NotLoggedInException | InterruptedException e) {
            log.error("XMPP error. Disconnecting and removing session...", e);
            throw new XMPPGenericException(connection.getUser().toString(), e);
        }
    }

    public Set<RosterEntry> getContacts(XMPPTCPConnection connection) {
        Roster roster = Roster.getInstanceFor(connection);

        if (!roster.isLoaded()) {
            try {
                roster.reloadAndWait();
            } catch (SmackException.NotLoggedInException | SmackException.NotConnectedException
                    | InterruptedException e) {
                log.error("XMPP error. Disconnecting and removing session...", e);
                throw new XMPPGenericException(connection.getUser().toString(), e);
            }
        }

        return roster.getEntries();
    }

    public void disconnect(XMPPTCPConnection connection) {
        Presence presence = PresenceBuilder.buildPresence()
                .ofType(Presence.Type.unavailable)
                .build();
        try {
            connection.sendStanza(presence);
        } catch (SmackException.NotConnectedException | InterruptedException e) {
            log.error("XMPP error.", e);

        }
        connection.disconnect();
        log.info("Connection closed for user '{}'.", connection.getUser());
    }

    public void sendStanza(XMPPTCPConnection connection, Presence.Type type) {
        Presence presence = PresenceBuilder.buildPresence()
                .ofType(type)
                .build();
        try {
            connection.sendStanza(presence);
            log.info("Status {} sent for user '{}'.", type, connection.getUser());
        } catch (SmackException.NotConnectedException | InterruptedException e) {
            log.error("XMPP error.", e);
            throw new XMPPGenericException(connection.getUser().toString(), e);
        }
    }
}
