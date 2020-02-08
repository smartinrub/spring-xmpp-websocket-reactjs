package com.sergiomartinrubio.springxmppwebsocketsecurity.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Message {

    public enum Type {AUTHENTICATED, CHAT, GROUP_CHAT, ERROR}

    private final String from;
    private final String to;
    private final String content;
    private final Type type;
}
