package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.impl.JidCreate;
import org.jxmpp.stringprep.XmppStringprepException;

public class XMPPClient {

    public static final String DOMAIN_NAME = "localhost";

    public XMPPTCPConnection createConnection(String username, String password) throws XmppStringprepException {
        EntityBareJid entityBareJid;
        entityBareJid = JidCreate.entityBareFrom(username + "@" + DOMAIN_NAME);
        XMPPTCPConnectionConfiguration config = XMPPTCPConnectionConfiguration.builder()
                .setHost("openfire")
                .setPort(5222)
                .setXmppDomain(DOMAIN_NAME)
                .setUsernameAndPassword(entityBareJid.getLocalpart(), password)
                .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                .setResource(entityBareJid.getResourceOrEmpty())
                .setSendPresence(true)
                .build();
        return new XMPPTCPConnection(config);
    }

}
