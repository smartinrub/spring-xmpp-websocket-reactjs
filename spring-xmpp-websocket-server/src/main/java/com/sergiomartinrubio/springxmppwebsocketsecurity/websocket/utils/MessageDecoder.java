package com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils;

import com.google.gson.Gson;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.WebsocketMessage;

import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class MessageDecoder implements Decoder.Text<WebsocketMessage> {

    @Override
    public WebsocketMessage decode(String message) {
        Gson gson = new Gson();
        return gson.fromJson(message, WebsocketMessage.class);
    }

    @Override
    public boolean willDecode(String message) {
        return (message != null);
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
