package com.sergiomartinrubio.springxmppwebsocketsecurity.model;

import org.jivesoftware.smack.tcp.XMPPTCPConnection;

public record XMPPSession(String username, XMPPTCPConnection connection) {
}
