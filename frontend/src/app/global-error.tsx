"use client";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-app-gradient px-4 py-10">
        <main className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center justify-center">
          <div className="w-full rounded-3xl border border-pink-200 bg-white p-6 text-center shadow-lg dark:border-pink-900/40 dark:bg-slate-950">
            <h1 className="font-heading text-xl font-semibold text-pink-700 dark:text-pink-300">
              Crisa encountered an unexpected error
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              The app recovered safely. No conversation data was persisted.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500"
            >
              Reload UI
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
