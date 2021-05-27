package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.TextMessage;
import com.sergiomartinrubio.springxmppwebsocketsecurity.websocket.utils.WebSocketTextMessageHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.packet.Message;
import org.springframework.stereotype.Component;

import javax.websocket.Session;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.NEW_MESSAGE;

@Slf4j
@Component
@RequiredArgsConstructor
public class XMPPMessageTransmitter {

    private final WebSocketTextMessageHelper webSocketTextMessageHelper;

    public void sendResponse(Message message, Session session) {
        log.info("New message from '{}' to '{}': {}", message.getFrom(), message.getTo(), message.getBody());
        String messageFrom = message.getFrom().getLocalpartOrNull().toString();
        String to = message.getTo().getLocalpartOrNull().toString();
        String content = message.getBody();
        webSocketTextMessageHelper.send(
                session,
                TextMessage.builder()
                        .from(messageFrom)
                        .to(to)
                        .content(content)
                        .messageType(NEW_MESSAGE).build()
        );
    }
}
