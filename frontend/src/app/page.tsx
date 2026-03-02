"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ChatContainer } from "@/components/chat/ChatContainer";
import { InputBar } from "@/components/chat/InputBar";
import { StatusIndicator } from "@/components/chat/StatusIndicator";
import { sendMessage, OllamaClientError } from "@/lib/ollamaClient";
import { logout, checkSession } from "@/lib/api";
import type { ChatMessage, RequestStatus } from "@/types/chat";

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "agent",
  text: "Olá, eu sou a Crisa. Pergunta-me qualquer coisa e farei o meu melhor para ajudar.",
  createdAt: 0, // Using 0 for initial stable timestamp
};

export default function HomePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const result = await checkSession();
      if (!result.success) {
        router.push("/login");
      }
    };
    validateSession();
  }, [router]);

  const isRequestInProgress = status === "sending" || status === "waiting" || status === "streaming";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const onSendMessage = async (text: string) => {
    // ... no changes needed here ...
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

      let friendlyMessage = "Problema de ligação. Por favor, tenta novamente.";
      if (error instanceof OllamaClientError) {
        if (error.message === "Backend not configured.") {
          friendlyMessage = "Servidor não configurado.";
        } else if (error.message === "Request timed out") {
          friendlyMessage = "Problema de ligação (tempo esgotado). Por favor, tenta novamente.";
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
    if (status === "sending") return "A enviar mensagem...";
    if (status === "waiting") return "A aguardar resposta...";
    if (status === "streaming") return "A Crisa está a pensar...";
    if (status === "error") return errorMessage || "Ligação perdida";
    return "Espaço de Trabalho Privado";
  }, [status, errorMessage]);

  return (
    <main className="flex min-h-dvh flex-col bg-app-gradient text-slate-900 transition-colors dark:text-slate-100">
      <header className="border-b border-pink-100/80 bg-white/75 px-4 py-3 backdrop-blur dark:border-pink-900/40 dark:bg-slate-950/75">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-pink-700 dark:text-pink-300">Crisa</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">{headerSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusIndicator status={status} errorMessage={errorMessage} />
            <button
              onClick={handleLogout}
              className="rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <ChatContainer messages={messages} isLoading={status === "waiting"} />

      <footer className="sticky bottom-0 border-t border-pink-100/80 bg-white/70 px-3 py-3 backdrop-blur dark:border-pink-900/40 dark:bg-slate-950/70 sm:px-5">
        <InputBar disabled={isRequestInProgress} onSendMessage={onSendMessage} />
      </footer>
    </main>
  );
}
