import type { Metadata } from "next";
import { LoginPageClient } from "@/components/auth/LoginPageClient";

export const metadata: Metadata = {
    title: "Entrar — Crisa AI",
    description: "Faça login para aceder à sua assistente pessoal Crisa.",
};

export default function LoginPage() {
    return <LoginPageClient />;
}
