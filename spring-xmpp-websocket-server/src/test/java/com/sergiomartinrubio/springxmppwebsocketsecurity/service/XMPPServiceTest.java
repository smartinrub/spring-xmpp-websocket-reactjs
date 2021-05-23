package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.TextMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.WebSocketTextMessageTransmitter;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPClient;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.jxmpp.stringprep.XmppStringprepException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.websocket.Session;
import java.util.Optional;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.ERROR;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.FORBIDDEN;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.JOIN_SUCCESS;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class XMPPServiceTest {

    private static final String USERNAME = "user";
    private static final String PASSWORD = "password";

    @Mock
    private AccountService accountService;

    @Mock
    private WebSocketTextMessageTransmitter webSocketTextMessageTransmitter;

    @Mock
    private XMPPClient xmppClient;

    @InjectMocks
    private XMPPService xmppService;

    @Test
    void shouldStartSessionWithoutCreatingAccountWhenAccountExistAndCorrectPassword() throws XmppStringprepException {
        // GIVEN
        Session session = Mockito.mock(Session.class);
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));

        // WHEN
        xmppService.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).should().login(connection);
        then(xmppClient).should().addIncomingMessageListener(connection, session);
        then(webSocketTextMessageTransmitter).should().send(session, createTextMessage(JOIN_SUCCESS));
        then(xmppClient).shouldHaveNoMoreInteractions();
    }

    @Test
    void shouldStartSessionAndCreateAccountWhenAccountDoesNotExist() throws XmppStringprepException {
        // GIVEN
        Session session = Mockito.mock(Session.class);
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        given(accountService.getAccount(USERNAME)).willReturn(Optional.empty());
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));

        // WHEN
        xmppService.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).should().login(connection);
        then(xmppClient).should().addIncomingMessageListener(connection, session);
        then(webSocketTextMessageTransmitter).should().send(session, createTextMessage(JOIN_SUCCESS));
        then(xmppClient).should().createAccount(connection, USERNAME, PASSWORD);
    }

    @Test
    void shouldSendForbiddenMessageWhenWrongPassword() {
        // GIVEN
        Session session = Mockito.mock(Session.class);
        String hashedPassword = BCrypt.hashpw("WRONG", BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));

        // WHEN
        xmppService.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).shouldHaveNoInteractions();
        then(webSocketTextMessageTransmitter).should().send(session, createTextMessage(FORBIDDEN));
    }

    @Test
    void shouldSendErrorMessageWhenConnectionIsNotPresent() {
        // GIVEN
        Session session = Mockito.mock(Session.class);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.empty());

        // WHEN
        xmppService.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).shouldHaveNoMoreInteractions();
        then(webSocketTextMessageTransmitter).should().send(session, createTextMessage(ERROR));
    }

    private TextMessage createTextMessage(MessageType type) {
        return TextMessage.builder()
                .messageType(type)
                .build();
    }
}
