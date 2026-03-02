import { useEffect, useRef } from "react";

import type { ChatMessage } from "@/types/chat";

import { MessageBubble } from "./MessageBubble";
import { TypingBubble } from "./TypingBubble";

type ChatContainerProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

export function ChatContainer({ messages, isLoading }: ChatContainerProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  return (
    <section
      className="flex-1 overflow-y-auto px-3 pb-4 pt-3 sm:px-5"
      aria-live="polite"
      aria-label="Conversation"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading ? <TypingBubble /> : null}
        <div ref={endRef} />
      </div>
    </section>
  );
}
