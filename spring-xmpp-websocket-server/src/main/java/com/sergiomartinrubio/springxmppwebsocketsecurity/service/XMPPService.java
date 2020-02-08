package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Message;
import org.springframework.web.socket.WebSocketSession;

public interface XMPPService {
    void addConnection(WebSocketSession session, String username);
    void connect(WebSocketSession session, String username);
    void addListener(WebSocketSession session);
    void handleMessage(Message message, WebSocketSession session);
    void closeConnection(WebSocketSession session);
}
