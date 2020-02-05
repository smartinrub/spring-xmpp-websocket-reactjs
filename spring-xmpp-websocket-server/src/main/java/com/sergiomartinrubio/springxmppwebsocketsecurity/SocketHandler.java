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
        var gson = new Gson();
        var xmppMessage = gson.fromJson(message.getPayload(), XMPPMessage.class);
        XMPPTCPConnection xmppTcpConnection = xmppService.getConnection(session).orElseGet(() -> {
            XMPPTCPConnection connection = xmppService.addConnection(session, xmppMessage.getFrom());
            xmppService.connect(connection);
            xmppService.addListener(session);
            return connection;
        });

        xmppService.handleMessage(xmppMessage, xmppTcpConnection);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Websocket connection created.");
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        xmppService.closeConnection(session);
        log.info("Websocket connection error.");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        xmppService.closeConnection(session);
        log.info("Websocket connection closed.");
    }
}
