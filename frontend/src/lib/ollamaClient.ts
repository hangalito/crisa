import { OLLAMA_CONFIG } from "@/config/ollama";
import api from "./axios";
import { isAxiosError } from "axios";

export interface OllamaMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface OllamaResponseChunk {
    model: string;
    created_at: string;
    message?: {
        role: string;
        content: string;
        thinking?: string;
    };
    done: boolean;
}

export class OllamaClientError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = "OllamaClientError";
    }
}

export async function* sendMessage(
    messages: { role: string; content: string }[],
    signal?: AbortSignal
): AsyncGenerator<string, void, unknown> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;

    const fullMessages: OllamaMessage[] = messages.map((m) => ({
        role: m.role === "agent" ? ("assistant" as const) : (m.role as "user" | "system"),
        content: m.content,
    }));

    const response = await api.post(apiUrl, {
        ...OLLAMA_CONFIG,
        messages: fullMessages,
        stream: true,
    }, {
        responseType: 'stream',
        adapter: 'fetch', // Use fetch adapter for browser streaming support
        signal,
    });

    // In Axios/Fetch adapter, response.data should be the stream
    const stream = response.data;

    if (!stream) {
        throw new OllamaClientError("Response data is null");
    }

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");

            // Keep the last partial line in the buffer
            buffer = lines.pop() || "";

            for (const line of lines) {
                if (!line.trim()) continue;

                try {
                    const chunk: OllamaResponseChunk = JSON.parse(line);

                    if (chunk.message?.content) {
                        yield chunk.message.content;
                    }

                    if (chunk.done) {
                        return;
                    }
                } catch (e) {
                    throw new OllamaClientError("JSON parsing failure", e);
                }
            }
        }

        // Process any remaining buffer
        if (buffer.trim()) {
            try {
                const chunk: OllamaResponseChunk = JSON.parse(buffer);
                if (chunk.message?.content) {
                    yield chunk.message.content;
                }
            } catch (e) {
                throw new OllamaClientError("JSON parsing failure", e);
            }
        }
    } catch (error) {
        if (error instanceof OllamaClientError) throw error;

        const isAbortError = error instanceof Error && (
            error.name === "AbortError" ||
            error.name === "TimeoutError" ||
            error.message.includes("aborted") ||
            error.message.includes("signal")
        );

        if (isAbortError) {
            throw new OllamaClientError("Request timed out");
        }

        throw new OllamaClientError("Network failure", error);
    } finally {
        try {
            reader.releaseLock();
        } catch {
            // Ignore lock release errors during cleanup
        }
    }
}
