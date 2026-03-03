import type { Metadata } from "next";
import { UnauthorizedPageClient } from "@/components/auth/UnauthorizedPageClient";

export const metadata: Metadata = {
    title: "Acesso Negado — Crisa AI",
    description: "Não tem permissão para aceder a esta página.",
};

export default function UnauthorizedPage() {
    return <UnauthorizedPageClient />;
}
