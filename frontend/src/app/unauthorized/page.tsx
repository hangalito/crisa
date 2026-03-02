"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-app-gradient p-4">
            <div className="w-full max-w-md text-center rounded-3xl border border-pink-100/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-pink-900/40 dark:bg-slate-950/80">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-10 w-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>

                <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Access Denied</h1>
                <p className="mb-8 text-slate-600 dark:text-slate-400">
                    Your email address is not authorized to access this application.
                </p>

                <Link
                    href="/login"
                    className="inline-block rounded-2xl bg-pink-600 px-8 py-3 font-semibold text-white transition hover:bg-pink-500 dark:bg-pink-500 dark:hover:bg-pink-400"
                >
                    Try a Different Email
                </Link>
            </div>
        </div>
    );
}
