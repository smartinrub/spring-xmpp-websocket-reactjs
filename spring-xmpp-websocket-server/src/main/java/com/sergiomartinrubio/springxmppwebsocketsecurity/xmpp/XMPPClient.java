package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.impl.JidCreate;
import org.jxmpp.stringprep.XmppStringprepException;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(XMPPConnection.class)
public class XMPPClient {

    public XMPPTCPConnection createConnection(String username, String password) throws XmppStringprepException {
        EntityBareJid entityBareJid;
        entityBareJid = JidCreate.entityBareFrom(username + "@" + "localhost");
        XMPPTCPConnectionConfiguration config = XMPPTCPConnectionConfiguration.builder()
                .setHost("localhost")
                .setPort(5222)
                .setXmppDomain("localhost")
                .setUsernameAndPassword(entityBareJid.getLocalpart(), password)
                .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                .setResource(entityBareJid.getResourceOrEmpty())
                .setSendPresence(true)
                .build();
        return new XMPPTCPConnection(config);
    }

}
