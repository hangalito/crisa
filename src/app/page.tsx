"use client";

import { useMemo, useState } from "react";

import { ChatContainer } from "@/components/chat/ChatContainer";
import { InputBar } from "@/components/chat/InputBar";
import { StatusIndicator } from "@/components/chat/StatusIndicator";
import { ChatApiError, sendMessageToAgent } from "@/lib/chat-api";
import type { ChatMessage, RequestStatus } from "@/types/chat";

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "agent",
  text: "Hi, I am Crisa. Ask me anything and I will do my best to help.",
  createdAt: Date.now(),
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function toSystemErrorMessage(text: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "system",
    text,
    createdAt: Date.now(),
  };
}

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  const isRequestInProgress = status === "sending" || status === "waiting";

  const onSendMessage = async (text: string) => {
    setErrorMessage(undefined);
    setStatus("sending");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      createdAt: Date.now(),
    };

    setMessages((current) => [...current, userMessage]);

    try {
      // Keep feedback explicit by surfacing both async steps.
      await sleep(180);
      setStatus("waiting");

      const reply = await sendMessageToAgent(text);

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "agent",
          text: reply,
          createdAt: Date.now(),
        },
      ]);
      setStatus("idle");
    } catch (error) {
      const friendlyMessage =
        error instanceof ChatApiError
          ? error.message
          : "Connection lost. Please check your network and try again.";

      setMessages((current) => [
        ...current,
        toSystemErrorMessage(`Unable to complete request: ${friendlyMessage}`),
      ]);
      setErrorMessage(friendlyMessage);
      setStatus("error");
    }
  };

  const headerSubtitle = useMemo(() => {
    if (status === "sending") return "Sending message...";
    if (status === "waiting") return "Waiting for response...";
    if (status === "error") return "Connection lost";
    return "Frontend-only phase";
  }, [status]);

  return (
    <main className="flex min-h-dvh flex-col bg-app-gradient text-slate-900 transition-colors dark:text-slate-100">
      <header className="border-b border-pink-100/80 bg-white/75 px-4 py-3 backdrop-blur dark:border-pink-900/40 dark:bg-slate-950/75">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-pink-700 dark:text-pink-300">Crisa</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">{headerSubtitle}</p>
          </div>
          <StatusIndicator status={status} errorMessage={errorMessage} />
        </div>
      </header>

      <ChatContainer messages={messages} isLoading={isRequestInProgress} />

      <footer className="sticky bottom-0 border-t border-pink-100/80 bg-white/70 px-3 py-3 backdrop-blur dark:border-pink-900/40 dark:bg-slate-950/70 sm:px-5">
        <InputBar disabled={isRequestInProgress} onSendMessage={onSendMessage} />
      </footer>
    </main>
  );
}
