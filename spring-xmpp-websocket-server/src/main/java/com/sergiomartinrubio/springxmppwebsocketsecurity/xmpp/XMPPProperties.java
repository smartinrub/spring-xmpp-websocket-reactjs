package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.boot.context.properties.bind.DefaultValue;

/**
 *  A connection contains common information needed to connect to an XMPP server
 *  and sign in.
 */
@Getter
@ConstructorBinding
@ConfigurationProperties(prefix = "xmpp")
public class XMPPProperties {

    /**
     * The address of the server.
     */
    private final String host;

    /**
     * The port to use (usually 5222).
     */
    private final int port;

    /**
     * The XMPP domain is what follows after the '@' sign in XMPP addresses (JIDs).
     */
    private final String domain;

    public XMPPProperties(@DefaultValue("5222") String host, int port, String domain) {
        this.host = host;
        this.port = port;
        this.domain = domain;
    }

    public String getHost() {
        return host;
    }

    public String getDomain() {
        return domain;
    }

    public int getPort() {
        return port;
    }
}
