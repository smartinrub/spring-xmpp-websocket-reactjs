package com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.WebsocketMessage;
import jakarta.websocket.EncodeException;
import jakarta.websocket.Session;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class WebSocketTextMessageHelper {

    public void send(Session session, WebsocketMessage websocketMessage) {
        try {
            log.info("Sending message of type '{}'.", websocketMessage.getMessageType());
            session.getBasicRemote().sendObject(websocketMessage);
        } catch (IOException | EncodeException e) {
            log.error("WebSocket error, message {} was not sent.", websocketMessage, e);
        }
    }
}
