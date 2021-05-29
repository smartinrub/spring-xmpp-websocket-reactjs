package com.sergiomartinrubio.springxmppwebsocketsecurity.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class WebsocketMessage {
    String from;
    String to;
    String content;
    MessageType messageType;
}
