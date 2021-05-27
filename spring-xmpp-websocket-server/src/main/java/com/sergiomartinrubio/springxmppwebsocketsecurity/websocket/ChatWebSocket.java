package com.sergiomartinrubio.springxmppwebsocketsecurity.websocket;

import com.sergiomartinrubio.springxmppwebsocketsecurity.config.SpringContext;
import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.WebSocketException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.TextMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.service.XMPPFacade;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.MessageDecoder;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.MessageEncoder;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat/{username}/{password}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class ChatWebSocket {

    private final XMPPFacade xmppFacade;

    public ChatWebSocket() {
        this.xmppFacade = (XMPPFacade) SpringContext.getApplicationContext().getBean("XMPPService");
    }

    @OnOpen
    public void open(Session session, @PathParam("username") String username, @PathParam("password") String password) {
        xmppFacade.startSession(session, username, password);
    }

    @OnMessage
    public void handleMessage(TextMessage message, Session session) {
        xmppFacade.sendMessage(message.getContent(), message.getTo(), session);
    }

    @OnClose
    public void close(Session session) {
        xmppFacade.disconnect(session);
    }

    @OnError
    public void onError(Throwable e) {
        throw new WebSocketException(e);
    }
}
