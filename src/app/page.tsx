"use client";

import { useMemo, useState, useRef } from "react";

import { ChatContainer } from "@/components/chat/ChatContainer";
import { InputBar } from "@/components/chat/InputBar";
import { StatusIndicator } from "@/components/chat/StatusIndicator";
import { sendMessage, OllamaClientError } from "@/lib/ollamaClient";
import type { ChatMessage, RequestStatus } from "@/types/chat";

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "agent",
  text: "Hi, I am Crisa. Ask me anything and I will do my best to help.",
  createdAt: Date.now(),
};

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const isRequestInProgress = status === "sending" || status === "waiting" || status === "streaming";

  const onSendMessage = async (text: string) => {
    setErrorMessage(undefined);
    setStatus("sending");

    const userMessageId = crypto.randomUUID();
    const assistantMessageId = crypto.randomUUID();

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      text,
      createdAt: Date.now(),
    };

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: assistantMessageId,
        role: "agent",
        text: "",
        createdAt: Date.now(),
      },
    ]);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 60000);

    try {
      setStatus("waiting");

      const stream = sendMessage(
        messages.concat(userMessage).map((m) => ({
          role: m.role,
          content: m.text,
        })),
        abortController.signal
      );

      let fullText = "";
      for await (const chunk of stream) {
        clearTimeout(timeoutId);
        if (status !== "streaming") setStatus("streaming");
        fullText += chunk;
        setMessages((current) =>
          current.map((m) =>
            m.id === assistantMessageId ? { ...m, text: fullText } : m
          )
        );
      }

      setStatus("idle");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Chat Error:", error);
      }

      let friendlyMessage = "Connection problem. Please try again.";
      if (error instanceof OllamaClientError) {
        if (error.message === "Backend not configured.") {
          friendlyMessage = "Backend not configured.";
        } else if (error.message === "Request timed out") {
          friendlyMessage = "Connection problem (timeout). Please try again.";
        } else if (error.message !== "Network failure") {
          friendlyMessage = error.message;
        }
      }

      setMessages((current) =>
        current.map((m) =>
          m.id === assistantMessageId
            ? { ...m, text: friendlyMessage }
            : m
        )
      );
      setErrorMessage(friendlyMessage);
      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
      abortControllerRef.current = null;
    }
  };

  const headerSubtitle = useMemo(() => {
    if (status === "sending") return "Sending message...";
    if (status === "waiting") return "Waiting for response...";
    if (status === "streaming") return "Crisa is thinking...";
    if (status === "error") return errorMessage || "Connection lost";
    return "Online";
  }, [status, errorMessage]);

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

      <ChatContainer messages={messages} isLoading={status === "waiting"} />

      <footer className="sticky bottom-0 border-t border-pink-100/80 bg-white/70 px-3 py-3 backdrop-blur dark:border-pink-900/40 dark:bg-slate-950/70 sm:px-5">
        <InputBar disabled={isRequestInProgress} onSendMessage={onSendMessage} />
      </footer>
    </main>
  );
}
