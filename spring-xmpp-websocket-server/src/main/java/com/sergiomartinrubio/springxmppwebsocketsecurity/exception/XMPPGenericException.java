package com.sergiomartinrubio.springxmppwebsocketsecurity.exception;

public class XMPPGenericException extends RuntimeException {

    private static final String MESSAGE = "Something went wrong when connecting to the XMPP server with username '%s'.";
    public XMPPGenericException(String username, Throwable e) {
        super(String.format(MESSAGE, username), e);
    }
}
