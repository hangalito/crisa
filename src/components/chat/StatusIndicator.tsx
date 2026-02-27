import type { RequestStatus } from "@/types/chat";

type StatusIndicatorProps = {
  status: RequestStatus;
  errorMessage?: string;
};

export function StatusIndicator({
  status,
  errorMessage,
}: StatusIndicatorProps) {
  if (status === "idle") {
    return null;
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
        {errorMessage ?? "Connection lost. Please try again."}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-pink-200 bg-pink-50 px-3 py-2 text-xs font-medium text-pink-800 dark:border-pink-700/40 dark:bg-pink-900/20 dark:text-pink-200">
      <span className="h-2 w-2 animate-pulse rounded-full bg-current" aria-hidden />
      <span>{status === "sending" ? "Sending message..." : "Waiting for response..."}</span>
    </div>
  );
}
