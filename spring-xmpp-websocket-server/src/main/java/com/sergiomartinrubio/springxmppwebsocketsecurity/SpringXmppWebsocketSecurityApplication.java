package com.sergiomartinrubio.springxmppwebsocketsecurity;

import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPConnection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(XMPPConnection.class)
public class SpringXmppWebsocketSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringXmppWebsocketSecurityApplication.class, args);
	}

}
