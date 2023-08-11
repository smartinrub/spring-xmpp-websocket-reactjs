package com.sergiomartinrubio.springxmppwebsocketsecurity.service;

import com.sergiomartinrubio.springxmppwebsocketsecurity.exception.XMPPGenericException;
import com.sergiomartinrubio.springxmppwebsocketsecurity.facade.XMPPFacade;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.Account;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.WebsocketMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.WebSocketTextMessageHelper;
import com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp.XMPPClient;
import jakarta.websocket.Session;
import org.jivesoftware.smack.packet.Presence;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.jxmpp.stringprep.XmppStringprepException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Optional;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.ERROR;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.FORBIDDEN;
import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.JOIN_SUCCESS;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.BDDMockito.willThrow;

@ExtendWith(MockitoExtension.class)
class XMPPFacadeTest {

    private static final String USERNAME = "user";
    private static final String PASSWORD = "password";
    private static final String MESSAGE = "hello world";
    private static final String TO = "other-user";

    @Mock
    private Session session;

    @Mock
    private AccountService accountService;

    @Mock
    private WebSocketTextMessageHelper webSocketTextMessageHelper;

    @Mock
    private XMPPClient xmppClient;

    @InjectMocks
    private XMPPFacade xmppFacade;


    @Test
    void startSessionShouldStartSessionWithoutCreatingAccountWhenAccountExistAndCorrectPassword() throws XmppStringprepException {
        // GIVEN
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));

        // WHEN
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).should().login(connection);
        then(xmppClient).should().addIncomingMessageListener(connection, session);
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(JOIN_SUCCESS, USERNAME));
        then(xmppClient).shouldHaveNoMoreInteractions();
    }

    @Test
    void startSessionShouldStartSessionAndCreateAccountWhenAccountDoesNotExist() throws XmppStringprepException {
        // GIVEN
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        given(accountService.getAccount(USERNAME)).willReturn(Optional.empty());
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));

        // WHEN
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).should().login(connection);
        then(xmppClient).should().addIncomingMessageListener(connection, session);
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(JOIN_SUCCESS, USERNAME));
        then(xmppClient).should().createAccount(connection, USERNAME, PASSWORD);
    }

    @Test
    void startSessionShouldSendForbiddenMessageWhenWrongPassword() {
        // GIVEN
        String hashedPassword = BCrypt.hashpw("WRONG", BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));

        // WHEN
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).shouldHaveNoInteractions();
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(FORBIDDEN, null));
    }

    @Test
    void startSessionShouldSendErrorMessageWhenConnectionIsNotPresent() {
        // GIVEN
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.empty());

        // WHEN
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).shouldHaveNoMoreInteractions();
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(ERROR, null));
    }

    @Test
    void startSessionShouldSendErrorMessageWhenLoginThrowsXMPPGenericException() throws XmppStringprepException {
        // GIVEN
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));
        willThrow(XMPPGenericException.class).given(xmppClient).login(connection);

        // WHEN
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // THEN
        then(xmppClient).should().disconnect(connection);
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(ERROR, null));
        then(xmppClient).shouldHaveNoMoreInteractions();
    }

    @Test
    void sendMessageShouldSendMessage() throws XmppStringprepException {
        // GIVEN
        WebsocketMessage message = WebsocketMessage.builder()
                .content(MESSAGE)
                .to(TO)
                .messageType(MessageType.NEW_MESSAGE)
                .build();
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // WHEN
        xmppFacade.sendMessage(message, session);

        // THEN
        then(xmppClient).should().sendMessage(connection, MESSAGE, TO);
    }

    @Test
    void sendMessageShouldSendErrorMessageWhenXMPPGenericException() throws XmppStringprepException {
        // GIVEN
        WebsocketMessage message = WebsocketMessage.builder()
                .content(MESSAGE)
                .to(TO)
                .messageType(MessageType.NEW_MESSAGE)
                .build();
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));
        xmppFacade.startSession(session, USERNAME, PASSWORD);
        willThrow(XMPPGenericException.class).given(xmppClient).sendMessage(connection, MESSAGE, TO);

        // WHEN
        xmppFacade.sendMessage(message, session);

        // THEN
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(ERROR, null));
    }

    @Test
    void sendMessageShouldDoNothingWhenNotFoundConnection() {
        // GIVEN
        WebsocketMessage message = WebsocketMessage.builder()
                .content(MESSAGE)
                .to(TO)
                .messageType(MessageType.NEW_MESSAGE)
                .build();

        // WHEN
        xmppFacade.sendMessage(message, session);

        // THEN
        then(xmppClient).shouldHaveNoInteractions();
    }

    @Test
    void disconnectShouldSendStanzaAndDisconnect() throws XmppStringprepException {
        // GIVEN
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));
        xmppFacade.startSession(session, USERNAME, PASSWORD);

        // WHEN
        xmppFacade.disconnect(session);

        // THEN
        then(xmppClient).should().sendStanza(connection, Presence.Type.unavailable);
        then(xmppClient).should().disconnect(connection);
    }

    @Test
    void disconnectShouldSendErrorMessageWhenXMPPGenericException() throws XmppStringprepException {
        // GIVEN
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setXmppDomain("domain")
                .build();
        XMPPTCPConnection connection = new XMPPTCPConnection(configuration);
        String hashedPassword = BCrypt.hashpw(PASSWORD, BCrypt.gensalt());
        given(accountService.getAccount(USERNAME)).willReturn(Optional.of(new Account(USERNAME, hashedPassword)));
        given(xmppClient.connect(USERNAME, PASSWORD)).willReturn(Optional.of(connection));
        xmppFacade.startSession(session, USERNAME, PASSWORD);
        willThrow(XMPPGenericException.class).given(xmppClient).sendStanza(connection, Presence.Type.unavailable);


        // WHEN
        xmppFacade.disconnect(session);

        // THEN
        then(webSocketTextMessageHelper).should().send(session, createTextMessage(ERROR, null));
    }

    @Test
    void disconnectShouldDoNothingWhenNotFoundConnection() {
        // WHEN
        xmppFacade.disconnect(session);

        // THEN
        then(xmppClient).shouldHaveNoInteractions();
    }

    private WebsocketMessage createTextMessage(MessageType type, String to) {
        return WebsocketMessage.builder()
                .to(to)
                .messageType(type)
                .build();
    }
}
