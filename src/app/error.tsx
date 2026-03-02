"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-app-gradient px-4">
      <div className="w-full max-w-md rounded-3xl border border-pink-200 bg-white p-6 text-center shadow-lg dark:border-pink-900/40 dark:bg-slate-950">
        <h1 className="font-heading text-xl font-semibold text-pink-700 dark:text-pink-300">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Crisa could not load this screen. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
