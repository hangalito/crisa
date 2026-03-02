"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyOTP, requestOTP } from "@/lib/api";

export default function VerifyPage() {
    const [code, setCode] = useState("");
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("auth_email");
        if (!storedEmail) {
            router.push("/login");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError(null);
        setMessage(null);

        const result = await verifyOTP(email, code);
        if (result.success) {
            sessionStorage.removeItem("auth_email");
            router.push("/");
        } else {
            setError(result.error || "Invalid code");
        }
        setLoading(false);
    };

    const handleResend = async () => {
        if (!email) return;
        setResending(true);
        setError(null);
        setMessage(null);

        const result = await requestOTP(email);
        if (result.success) {
            setMessage("New code requested successfully.");
        } else {
            setError(result.error || "Failed to resend code");
        }
        setResending(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-app-gradient p-4">
            <div className="w-full max-w-md rounded-3xl border border-pink-100/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-pink-900/40 dark:bg-slate-950/80">
                <h1 className="mb-6 text-center text-3xl font-bold text-pink-700 dark:text-pink-300">Verify Code</h1>
                <p className="mb-8 text-center text-slate-600 dark:text-slate-400">
                    Enter the 6-digit code sent to<br />
                    <span className="font-semibold text-pink-600 dark:text-pink-400">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="code" className="sr-only">Access Code</label>
                        <input
                            id="code"
                            type="text"
                            maxLength={6}
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            placeholder="000000"
                            className="w-full text-center text-3xl tracking-[0.5em] rounded-2xl border border-pink-200 bg-white/50 px-4 py-4 text-slate-900 font-mono outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:border-pink-900/50 dark:bg-slate-900/50 dark:text-white dark:focus:border-pink-700 dark:focus:ring-pink-900/60"
                        />
                    </div>

                    {error && (
                        <p className="text-center text-sm font-medium text-rose-500">{error}</p>
                    )}
                    {message && (
                        <p className="text-center text-sm font-medium text-emerald-500">{message}</p>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={loading || code.length !== 6}
                            className="w-full rounded-2xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-500 disabled:bg-pink-300 dark:bg-pink-500 dark:hover:bg-pink-400 dark:disabled:bg-pink-800"
                        >
                            {loading ? "Verifying..." : "Continue"}
                        </button>
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="w-full rounded-2xl border border-pink-200 py-3 font-semibold text-pink-700 transition hover:bg-pink-50 dark:border-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-900/20"
                        >
                            {resending ? "Resending..." : "Resend Code"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
