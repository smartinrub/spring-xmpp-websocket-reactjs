package com.sergiomartinrubio.springxmppwebsocketsecurity.controller;

import com.sergiomartinrubio.springxmppwebsocketsecurity.controller.util.MessageDecoder;
import com.sergiomartinrubio.springxmppwebsocketsecurity.controller.util.MessageEncoder;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPClient;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPIncomingChatMessageListener;
import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.WebSocketException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPGenericException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.TextMessage;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.ChatManager;
import org.jivesoftware.smack.packet.Presence;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.impl.JidCreate;
import org.jxmpp.stringprep.XmppStringprepException;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.ERROR;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.JOIN_SUCCESS;

@Slf4j
@ServerEndpoint(value = "/chat/{username}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class WebSocketController {

    private Map<Session, XMPPTCPConnection> connections = new HashMap<>();

    @SneakyThrows
    @OnOpen
    public void open(Session session, @PathParam("username") String username) {
        log.info("Establishing connection with username {} ", username);
        XMPPClient xmppClient = new XMPPClient();
        XMPPTCPConnection connection = xmppClient.connect(username, "password");
        connections.put(session, connection);
        TextMessage textMessage;
        try {
            connection.connect().login();
        } catch (XMPPException | SmackException | IOException | InterruptedException e) {
            log.error("Error connecting with XMPP server: {}", e.toString());
            connection.disconnect();
            textMessage = TextMessage.builder()
                    .to(username)
                    .messageType(ERROR)
                    .build();
            session.getBasicRemote().sendObject(textMessage);
            throw new XMPPGenericException("Error connecting with XMPP server", e);
        }
        log.info("Connected!");
        try {
            textMessage = TextMessage.builder()
                    .to(username)
                    .messageType(JOIN_SUCCESS)
                    .build();
            session.getBasicRemote().sendObject(textMessage);
        } catch (IOException | EncodeException e) {
            connection.disconnect();
            connections.remove(session);
            throw new WebSocketException(e);
        }
        ChatManager chatManager = ChatManager.getInstanceFor(connection);
        chatManager.addIncomingListener(new XMPPIncomingChatMessageListener(session));
    }

    @OnMessage
    public void handleMessage(TextMessage message, Session session) throws XmppStringprepException,
            SmackException.NotConnectedException, InterruptedException {
        log.info(message.toString());
        EntityBareJid entityBareJid = JidCreate.entityBareFrom(message.getTo() + "@localhost");
        XMPPTCPConnection connection = connections.get(session);
        ChatManager chatManager = ChatManager.getInstanceFor(connection);
        Chat chat = chatManager.chatWith(entityBareJid);
        chat.send(message.getContent());
    }

    @OnClose
    @SneakyThrows
    public void close(Session session) {
        log.info("Connection closed!");
        Presence presence = new Presence(Presence.Type.unavailable);
        XMPPTCPConnection connection = connections.get(session);
        connection.sendStanza(presence);
        connection.disconnect();
    }

    @OnError
    public void onError(Throwable error) {
        throw new WebSocketException(error);
    }
}
