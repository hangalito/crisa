import type { ChatMessage } from "@/types/chat";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="mx-auto my-2 max-w-[90%] rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
        {message.text}
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <article
        className={[
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-colors md:max-w-[72%]",
          isUser
            ? "rounded-br-sm bg-pink-600 text-white"
            : "rounded-bl-sm border border-pink-200 bg-white text-slate-800 dark:border-pink-900/50 dark:bg-slate-900 dark:text-slate-100",
        ].join(" ")}
      >
        {message.text}
      </article>
    </div>
  );
}
