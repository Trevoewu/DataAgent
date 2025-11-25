package com.dataagent.controller;

import com.dataagent.dto.ChatDTO;
import com.dataagent.service.ChatService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/chat")
public class chat {

    @Autowired
    private ChatService chatService;

    @PostMapping("/custom/chat")
    public Flux<String> customChat(
            HttpServletResponse response,
            @Validated @RequestBody ChatDTO chatDTO
    ) {
        // 设置响应编码
        response.setCharacterEncoding("UTF-8");

        // 直接使用传入的参数调用聊天服务
        return chatService.chatRequest(chatDTO);
    }

}
