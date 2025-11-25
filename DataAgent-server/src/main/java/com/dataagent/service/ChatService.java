package com.dataagent.service;

import com.alibaba.cloud.ai.dashscope.api.DashScopeApi;
import com.alibaba.cloud.ai.dashscope.chat.DashScopeChatModel;
import com.alibaba.cloud.ai.dashscope.chat.DashScopeChatOptions;
import com.dataagent.dto.ChatDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Value("${spring.ai.dashscope.api-key}")
    private String defaultApiKey;

    // 用alibaba框架来调用大模型
    public Flux<String> chat(ChatDTO chatDTO) {
        String prompt = chatDTO.getPrompt();
        String modelId = chatDTO.getModelId();
        String apiKey = StringUtils.hasText(chatDTO.getApiKey()) ? chatDTO.getApiKey() : defaultApiKey;

        // 构建 DashScopeApi 实例
        DashScopeApi dashScopeApi = DashScopeApi.builder()
                .apiKey(apiKey)
                .build();

        // 创建 ChatModel 实例
        ChatModel chatModel = DashScopeChatModel.builder()
                .dashScopeApi(dashScopeApi)
                .build();

        // 构建运行时选项
        var runtimeOptions = DashScopeChatOptions.builder()
                .withModel(modelId)
                .withTemperature(0.8)
                .build();

        // 使用 ChatModel 创建 ChatClient
        ChatClient tempChatClient = ChatClient.builder(chatModel)
                .build();

        return tempChatClient.prompt()
                .options(runtimeOptions)
                .user(prompt)
                .stream()
                .content();
    }

    // 用请求来带调用大模型
    public Flux<String> chatRequest(ChatDTO chatDTO) {
        String url = chatDTO.getBaseUrl();
        String apiKey = chatDTO.getApiKey();
        String prompt = chatDTO.getPrompt();
        String modelId = chatDTO.getModelId();


        WebClient webClient = WebClient.builder()
                .baseUrl(url)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();

        // 构建请求数据
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("model", modelId);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);
        messages.add(message);
        requestData.put("messages", messages);

        return webClient.post()
                .bodyValue(requestData)
                .retrieve()
                .bodyToMono(String.class)
                .flux()
                .onErrorResume(WebClientResponseException.class, ex -> {
                    // 处理错误响应
                    return Mono.just("Error: " + ex.getMessage());
                });
    }
}