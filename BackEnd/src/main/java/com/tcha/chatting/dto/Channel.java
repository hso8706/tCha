package com.tcha.chatting.dto;

//import com.tcha.chatting.service.ChatService;
//import lombok.Builder;

import lombok.Getter;
import lombok.Setter;
//import org.springframework.web.socket.WebSocketSession;
//
//import java.util.HashSet;
//import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class Channel {

    private String id;
    private String name;
//    private Set<WebSocketSession> sessions = new HashSet<>();

    //    @Builder
    public static Channel create(String name) {
        Channel channel = new Channel();
        channel.id = UUID.randomUUID().toString();
        channel.name = name;
        return channel;
    }

//    public void handleActions(WebSocketSession session, Message message, ChatService service) {
//        if (message.getType().equals(Message.MessageType.ENTER)) {
//            sessions.add(session);
//            message.setContent(message.getSender() + "님이 입장하였습니다.");
//        }
//        sendMessage(message, service);
//    }
//
//    public <T> void sendMessage(T message, ChatService service) {
//        sessions.parallelStream().forEach(session -> service.sendMessage(message, session));
//    }
}