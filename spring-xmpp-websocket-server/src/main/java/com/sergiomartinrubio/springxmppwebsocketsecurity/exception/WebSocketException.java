package com.sergiomartinrubio.springxmppwebsocketsecurity.exception;

public class WebSocketException extends RuntimeException {
    public WebSocketException(Throwable error) {
        super(error);
    }
}
