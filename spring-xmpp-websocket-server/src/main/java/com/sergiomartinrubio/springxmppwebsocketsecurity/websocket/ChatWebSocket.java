package com.sergiomartinrubio.springxmppwebsocketsecurity.websocket;

import com.sergiomartinrubio.springxmppwebsocketsecurity.config.SpringContext;
import com.sergiomartinrubio.springxmppwebsocketsecurity.facade.XMPPFacade;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.WebsocketMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.MessageDecoder;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.MessageEncoder;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@ServerEndpoint(value = "/chat/{username}/{password}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class ChatWebSocket {

    private final XMPPFacade xmppFacade;

    public ChatWebSocket() {
        this.xmppFacade = (XMPPFacade) SpringContext.getApplicationContext().getBean("XMPPFacade");
    }

    @OnOpen
    public void open(Session session, @PathParam("username") String username, @PathParam("password") String password) {
        log.info("Starting XMPP session '{}'.", session.getId());
        xmppFacade.startSession(session, username, password);
    }

    @OnMessage
    public void handleMessage(WebsocketMessage message, Session session) {
        log.info("Sending message for session '{}'.", session.getId());
        xmppFacade.sendMessage(message, session);
        log.info("Message sent for session '{}'.", session.getId());
    }

    @OnClose
    public void close(Session session) {
        xmppFacade.disconnect(session);
    }

    @OnError
    public void onError(Throwable e, Session session) {
        log.warn("Something went wrong.", e);
        xmppFacade.disconnect(session);
    }
}
