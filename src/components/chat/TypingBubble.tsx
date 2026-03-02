export function TypingBubble() {
  return (
    <div className="flex w-full justify-start" aria-live="polite" aria-label="Agent is typing">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-pink-200 bg-white px-4 py-3 shadow-sm dark:border-pink-900/50 dark:bg-slate-900">
        <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500" />
      </div>
    </div>
  );
}
