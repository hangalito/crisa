"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestOTP } from "@/lib/api";

export function LoginPageClient() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await requestOTP(email);
        if (result.success) {
            sessionStorage.setItem("auth_email", email);
            router.push("/verify");
        } else {
            if (result.error === "unauthorized") {
                router.push("/unauthorized");
            } else {
                setError(result.error || "Ocorreu um erro");
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-app-gradient p-4 text-slate-900 dark:text-slate-100">
            <div className="w-full max-w-md rounded-3xl border border-pink-100/80 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-pink-900/40 dark:bg-slate-950/80">
                <h1 className="mb-6 text-center text-3xl font-bold text-pink-700 dark:text-pink-300">Crisa</h1>
                <p className="mb-8 text-center text-slate-600 dark:text-slate-400">
                    Insira o teu e-mail para receber um código de acesso.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Endereço de e-mail</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full rounded-2xl border border-pink-200 bg-white/50 px-4 py-3 text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:border-pink-900/50 dark:bg-slate-900/50 dark:text-white dark:focus:border-pink-700 dark:focus:ring-pink-900/60"
                        />
                    </div>

                    {error && (
                        <p className="text-center text-sm font-medium text-rose-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-500 disabled:bg-pink-300 dark:bg-pink-500 dark:hover:bg-pink-400 dark:disabled:bg-pink-800"
                    >
                        {loading ? "A enviar..." : "Enviar Código de Acesso"}
                    </button>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="text-sm font-medium text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-400"
                        >
                            ← Voltar à página inicial
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
