import type { Metadata } from "next";
import { ChatPageClient } from "@/components/chat/ChatPageClient";

export const metadata: Metadata = {
  title: "Chat — Crisa AI",
  description: "Secure, private, and authenticated workspace with Crisa, your AI agent.",
  openGraph: {
    title: "Chat — Crisa AI",
    description: "Secure, private, and authenticated workspace with Crisa, your AI agent.",
  },
};

export default function ChatPage() {
  return <ChatPageClient />;
}
