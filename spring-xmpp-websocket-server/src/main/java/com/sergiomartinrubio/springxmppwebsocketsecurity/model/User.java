package com.sergiomartinrubio.springxmppwebsocketsecurity.model;

import lombok.Value;

import java.util.UUID;

@Value
public class User {
    private final UUID id;
    private final String name;
}
