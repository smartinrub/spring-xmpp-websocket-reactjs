package com.sergiomartinrubio.springxmppwebsocketsecurity.exception;

public class XMPPConnectionNotFoundException extends RuntimeException {

    public XMPPConnectionNotFoundException(String sessionId) {
        super(String.format("XMPP connection not found for session %s.", sessionId));
    }

}
