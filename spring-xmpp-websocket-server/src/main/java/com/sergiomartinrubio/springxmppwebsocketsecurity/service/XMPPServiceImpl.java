package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPConnectionNotFoundException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPGenericException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.XMPPMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPIncomingChatMessageListener;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.ChatManager;
import org.jivesoftware.smack.packet.Presence;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.impl.JidCreate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
//@EnableConfigurationProperties(XMPPProperties.class)
public class XMPPServiceImpl implements XMPPService {

//    private final XMPPProperties properties;

    private Map<WebSocketSession, XMPPTCPConnection> connections = new HashMap<>();

    @Override
    public Optional<XMPPTCPConnection> getConnection(WebSocketSession session) {
        return Optional.ofNullable(connections.get(session));
    }

    @Override
    public XMPPTCPConnection addConnection(WebSocketSession session, String username) {
        log.info("Establishing connection with username {}.", username);
        var xmppConfiguration = buildConnection(username);
        XMPPTCPConnection xmppTcpConnection = new XMPPTCPConnection(xmppConfiguration);
        connections.put(session, xmppTcpConnection);
        return xmppTcpConnection;
    }

    @Override
    public void connect(XMPPTCPConnection connection) {
        try {
            connection.connect();
        } catch (SmackException | IOException | XMPPException | InterruptedException e) {
            throw new XMPPGenericException("XMPP connection failed.", e);
        }
        log.info("Connection established with XMPP.");
    }

    @Override
    public void addListener(WebSocketSession session) {
        var xmppTcpConnection = Optional.ofNullable(connections.get(session))
                .orElseThrow(() -> new XMPPConnectionNotFoundException(session.getId()));
        var chatManager = ChatManager.getInstanceFor(xmppTcpConnection);
        chatManager.addIncomingListener(new XMPPIncomingChatMessageListener(session));
    }

    @SneakyThrows
    @Override
    public void handleMessage(XMPPMessage message, XMPPTCPConnection connection) {
//        ChatManager.getInstanceFor(connection)
//                .chatWith(entityBareFrom(message.getTo() + "@localhost"))
//                .send(message.getContent());
        log.info(message.toString());
        EntityBareJid entityBareJid = JidCreate.entityBareFrom(message.getTo() + "@localhost");
        ChatManager chatManager = ChatManager.getInstanceFor(connection);
        Chat chat = chatManager.chatWith(entityBareJid);
        chat.send(message.getContent());
    }

    @Override
    public void closeConnection(WebSocketSession session) {
        var xmppTcpConnection = Optional.ofNullable(connections.get(session))
                .orElseThrow(() -> new XMPPConnectionNotFoundException(session.getId()));
        Presence presence = new Presence(Presence.Type.unavailable);
        try {
            xmppTcpConnection.sendStanza(presence);
        } catch (SmackException.NotConnectedException | InterruptedException e) {
            throw new XMPPGenericException("XMPP connection failed.", e);
        }
        xmppTcpConnection.disconnect();
        log.info("XMPP connection closed.");
    }

    @SneakyThrows
    private XMPPTCPConnectionConfiguration buildConnection(String username) {
        EntityBareJid entityBareJid;

        entityBareJid = JidCreate.entityBareFrom(username + "@" + "localhost");
        return XMPPTCPConnectionConfiguration.builder()
                .setHost("localhost")
                .setPort(5222)
                .setXmppDomain("localhost")
                .setUsernameAndPassword(entityBareJid.getLocalpart(), "password")
                .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                .setResource(entityBareJid.getResourceOrEmpty())
                .setSendPresence(true)
                .build();

    }

}
