package com.sergiomartinrubio.springxmppwebsocketsecurity;

import com.google.gson.Gson;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.XMPPMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.service.XMPPServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@AllArgsConstructor
public class SocketHandler extends TextWebSocketHandler {

    private final XMPPServiceImpl xmppService;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        var xmppMessage = new Gson().fromJson(message.getPayload(), XMPPMessage.class);
        xmppService.handleMessage(xmppMessage, session);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Websocket connection created.");
        String username = (String) session.getAttributes().get("username");
        xmppService.addConnection(session, username);
        xmppService.connect(session, username);
        xmppService.addListener(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
//        xmppService.closeConnection(session);
        log.info("Websocket connection error.");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        xmppService.closeConnection(session);
        log.info("Websocket connection closed with status {}.", status);
    }
}
