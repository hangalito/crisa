import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Crisa — Creative, Reasonable, Interactive and Supportive AI",
    description: "Meet Crisa, your personalized AI assistant designed for safe, supportive, and intelligent conversations.",
    openGraph: {
        title: "Crisa — Creative, Reasonable, Interactive and Supportive AI",
        description: "Meet Crisa, your personalized AI assistant designed for safe, supportive, and intelligent conversations.",
    },
};

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-app-gradient text-slate-900 dark:text-slate-100">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-pink-100/50 bg-white/70 px-6 py-4 backdrop-blur-md dark:border-pink-900/30 dark:bg-slate-950/70">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold tracking-tight text-pink-600 dark:text-pink-400">Crisa</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/chat" className="rounded-2xl bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-500/30 dark:bg-pink-500 dark:hover:bg-pink-400">
                            Começar agora
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="animate-fade-in text-base font-semibold leading-7 text-pink-600 dark:text-pink-400">
                            Inteligência Conversacional
                        </h2>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
                            Crisa: A Tua Assistente <span className="bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">Criativa e Racional</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Descobre a Crisa, uma IA desenhada para conversas personalizadas, seguras e de apoio.
                            Criativa nos resultados, Racional na abordagem, Interativa no diálogo e Sempre Solidária.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/chat"
                                className="rounded-2xl bg-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-pink-500/20 transition hover:bg-pink-500 hover:-translate-y-0.5 dark:bg-pink-500 dark:hover:bg-pink-400"
                            >
                                Conversar com a Crisa
                            </Link>
                            <a href="#features" className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300">
                                Saber mais <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Mockup Preview */}
                    <div className="mt-16 flow-root sm:mt-24">
                        <div className="-m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/5 dark:ring-white/10">
                            <div className="rounded-lg bg-white shadow-2xl dark:bg-slate-900 aspect-[16/9] flex flex-col overflow-hidden border border-pink-100 dark:border-pink-900/50">
                                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-pink-100/50 dark:border-pink-900/30 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    <div className="ml-4 h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-end">
                                        <div className="bg-pink-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-[70%] text-sm">
                                            Olá Crisa! Podes ajudar-me a planear o meu dia?
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm border border-slate-200 dark:border-slate-700">
                                            Claro! Terei todo o gosto em ajudar. Que tal começarmos pelas tuas prioridades mais importantes para hoje?
                                        </div>
                                    </div>
                                    <div className="flex justify-end opacity-50">
                                        <div className="bg-pink-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-[60%] text-sm">
                                            Tenho uma reunião às 10h e...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-pink-600 dark:text-pink-400">Capacidades</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                O que torna a Crisa especial?
                            </p>
                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Uma IA desenhada para ser mais do que apenas um chat, focada em utilidade e segurança.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30">
                                            ✨
                                        </div>
                                        Criativa
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                                        <p className="flex-auto">Gera ideias, redige textos e ajuda-te a desbloquear o teu potencial criativo com sugestões inteligentes.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30">
                                            ⚖️
                                        </div>
                                        Racional
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                                        <p className="flex-auto">Fornece respostas lógicas, precisas e baseadas em factos para te ajudar a tomar decisões informadas.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30">
                                            🛡️
                                        </div>
                                        Segura & Privada
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                                        <p className="flex-auto">As tuas conversas são privadas e autenticadas, garantindo que o teu espaço de trabalho permanece só teu.</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            <div className="max-w-xl lg:max-w-lg">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Inicia a tua jornada hoje.</h2>
                                <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                    Pronta para te ajudar com qualquer desafio, desde o planeamento diário até à resolução de problemas complexos.
                                </p>
                                <div className="mt-6 flex max-w-md gap-x-4">
                                    <Link
                                        href="/chat"
                                        className="flex-none rounded-2xl bg-pink-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-pink-500/20 transition hover:bg-pink-500 dark:bg-pink-500 dark:hover:bg-pink-400"
                                    >
                                        Entrar Agora
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                                <div className="flex flex-col items-start">
                                    <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                        🇵🇹
                                    </div>
                                    <dt className="mt-4 font-semibold text-slate-900 dark:text-white">Suporte em Português</dt>
                                    <dd className="mt-2 leading-7 text-slate-600 dark:text-slate-400">Totalmente otimizada para o idioma português.</dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                        ⚡
                                    </div>
                                    <dt className="mt-4 font-semibold text-slate-900 dark:text-white">Respostas Rápidas</dt>
                                    <dd className="mt-2 leading-7 text-slate-600 dark:text-slate-400">Interações fluídas com streaming de texto em tempo real.</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-pink-100/50 bg-white/50 py-12 dark:border-pink-900/10 dark:bg-slate-950/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                        &copy; 2026 Crisa AI. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
