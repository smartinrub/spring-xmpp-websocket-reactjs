package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.WebSocketUtils;
import com.sergiomartinrubio.springxmppwebsocketsecurity.config.XMPPProperties;
import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPConnectionNotFoundException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.listener.XMPPChatMessageListener;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Message;
import lombok.RequiredArgsConstructor;
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
import org.jxmpp.jid.parts.Localpart;
import org.jxmpp.jid.parts.Resourcepart;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.Message.Type.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class XMPPServiceImpl implements XMPPService {

    private final XMPPProperties properties;
    private final WebSocketUtils webSocketUtils;

    // TODO: Store connections in DB
    private Map<WebSocketSession, XMPPTCPConnection> connections = new HashMap<>();

    @Override
    public void addConnection(WebSocketSession session, String username) {
        log.info("Creating connection with username {}.", username);
        var xmppConfiguration = buildConnection(username);
        connections.put(session, new XMPPTCPConnection(xmppConfiguration));
    }

    @SneakyThrows
    @Override
    public void connect(WebSocketSession session, String username) {
        XMPPTCPConnection connection = connections.get(session);
        try {
            connection.connect().login();
        } catch (SmackException | IOException | XMPPException | InterruptedException e) {
            webSocketUtils.sendMessage(username, ERROR, session);
            throw e;
        }
        log.info("Connection established with XMPP.");
        webSocketUtils.sendMessage(username, AUTHENTICATED, session);
    }

    @Override
    public void addListener(WebSocketSession session) {
        var xmppTcpConnection = getConnection(session);
        var chatManager = ChatManager.getInstanceFor(xmppTcpConnection);
        chatManager.addIncomingListener(new XMPPChatMessageListener(session));
    }

    @SneakyThrows
    @Override
    public void handleMessage(Message message, WebSocketSession session) {
        log.info(message.toString());
        var xmppTcpConnection = getConnection(session);
        EntityBareJid entityBareJid = JidCreate.entityBareFrom(message.getTo() + "@localhost");
        ChatManager chatManager = ChatManager.getInstanceFor(xmppTcpConnection);
        Chat chat = chatManager.chatWith(entityBareJid);
        chat.send(message.getContent());
    }

    @Override
    public void closeConnection(WebSocketSession session) {
        var xmppTcpConnection = getConnection(session);
        var presence = new Presence(Presence.Type.unavailable);
        try {
            xmppTcpConnection.sendStanza(presence);
        } catch (SmackException.NotConnectedException | InterruptedException e) {
            log.error("Cannot connect to XMPP server");
            webSocketUtils.sendMessage("", ERROR, session);
        }
        xmppTcpConnection.disconnect();
        log.info("XMPP connection closed.");
    }

    public XMPPTCPConnection getConnection(WebSocketSession session) {
        return Optional.ofNullable(connections.get(session))
                .orElseThrow(() -> new XMPPConnectionNotFoundException(session.getId()));
    }

    @SneakyThrows
    private XMPPTCPConnectionConfiguration buildConnection(String username) {
        Localpart localpart = Localpart.fromUnescaped(username);
//        Domainpart domainpart = Domainpart.from("localhost");
        Resourcepart resourcepart = Resourcepart.from("web");
        return XMPPTCPConnectionConfiguration.builder()
                .setHost("localhost")
                .setPort(properties.getPort())
                .setXmppDomain(properties.getDomain())
                .setUsernameAndPassword(localpart, "password")
                .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                .setResource(resourcepart)
                .setSendPresence(true)
                .build();
    }

}
