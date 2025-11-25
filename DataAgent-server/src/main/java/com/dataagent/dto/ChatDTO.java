package com.dataagent.dto;

import lombok.Data;

@Data
public class ChatDTO {
    private String prompt;
    private String baseUrl;
    private String modelId;
    private String apiKey;
    private String chatId;
}
