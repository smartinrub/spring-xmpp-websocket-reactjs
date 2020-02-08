package com.sergiomartinrubio.springxmppwebsocketsecurity;

import com.google.gson.Gson;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Message;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Message.Type;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class WebSocketUtils {

    @SneakyThrows
    public void sendMessage(String username, Type type, WebSocketSession session) {
        Message message = Message.builder().to(username).type(type).build();
        Gson gson = new Gson();
        String xmppMessageJson = gson.toJson(message);
        session.sendMessage(new TextMessage(xmppMessageJson.getBytes()));
    }
}
