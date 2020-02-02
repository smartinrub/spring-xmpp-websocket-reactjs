package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.TextMessage;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.IncomingChatMessageListener;
import org.jivesoftware.smack.packet.Message;
import org.jxmpp.jid.EntityBareJid;

import javax.websocket.Session;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.NEW_MESSAGE;

@Slf4j
@AllArgsConstructor
public class XMPPIncomingChatMessageListener implements IncomingChatMessageListener {

    private final Session session;

    @Override
    @SneakyThrows
    public void newIncomingMessage(EntityBareJid from, Message message, Chat chat) {
        log.info("New message from {} to {}: {}", message.getFrom(), message.getTo(), message.getBody());
        TextMessage textMessage = TextMessage.builder()
                .from(message.getFrom().getLocalpartOrNull().toString())
                .to(message.getTo().getLocalpartOrNull().toString())
                .content(message.getBody())
                .messageType(NEW_MESSAGE)
                .build();
            session.getBasicRemote().sendObject(textMessage);

    }
}
