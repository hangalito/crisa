export type MessageRole = "user" | "agent" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: number;
}

export type RequestStatus = "idle" | "sending" | "waiting" | "error";
