package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.XMPPMessage;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.springframework.web.socket.WebSocketSession;

import java.util.Optional;

public interface XMPPService {
    void addConnection(WebSocketSession session, String username);
    void connect(WebSocketSession session, String username);
    void addListener(WebSocketSession session);
    void handleMessage(XMPPMessage message, WebSocketSession session);
    void closeConnection(WebSocketSession session);
}
