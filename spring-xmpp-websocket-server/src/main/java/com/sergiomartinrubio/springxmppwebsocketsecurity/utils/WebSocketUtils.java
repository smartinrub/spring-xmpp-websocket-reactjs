package com.sergiomartinrubio.springxmppwebsocketsecurity.utils;

import com.google.gson.Gson;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Message;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class WebSocketUtils {

    @SneakyThrows
    public void sendMessage(Message message, WebSocketSession session) {
        Gson gson = new Gson();
        String xmppMessageJson = gson.toJson(message);
        session.sendMessage(new TextMessage(xmppMessageJson.getBytes()));
    }
}
