import { http } from "./request";

export function chatLLM(data: any) {
  return http.post("/api/chat/custom/chat", data);
}
