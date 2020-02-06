package com.sergiomartinrubio.springxmppwebsocketsecurity.xmpp;

import com.google.gson.Gson;
import com.sergiomartinrubio.springxmppwebsocketsecurity.model.XMPPMessage;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.IncomingChatMessageListener;
import org.jivesoftware.smack.packet.Message;
import org.jxmpp.jid.EntityBareJid;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;

import static com.sergiomartinrubio.springxmppwebsocketsecurity.model.MessageType.NEW_MESSAGE;

@Slf4j
@RequiredArgsConstructor
public class XMPPIncomingChatMessageListener implements IncomingChatMessageListener {

    private final WebSocketSession session;

    @Override
    @SneakyThrows
    public void newIncomingMessage(EntityBareJid from, Message message, Chat chat) {
        log.info("New message from {} to {}: {}", message.getFrom(), message.getTo(), message.getBody());
        XMPPMessage xmppMessage = XMPPMessage.builder()
                .from(message.getFrom().getLocalpartOrNull().toString())
                .to(message.getTo().getLocalpartOrNull().toString())
                .content(message.getBody())
                .messageType(NEW_MESSAGE)
                .build();
        Gson gson = new Gson();
        String xmppMessageJson = gson.toJson(xmppMessage);
//        session.sendMessage(new BinaryMessage(xmppMessageJson.getBytes()));
    }
}
