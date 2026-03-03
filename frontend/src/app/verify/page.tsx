import type { Metadata } from "next";
import { VerifyPageClient } from "@/components/auth/VerifyPageClient";

export const metadata: Metadata = {
    title: "Verificar Código — Crisa AI",
    description: "Verifique o seu código de acesso para entrar na Crisa.",
};

export default function VerifyPage() {
    return <VerifyPageClient />;
}
