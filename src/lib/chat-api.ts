const REQUEST_TIMEOUT_MS = 20000;

export class ChatApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatApiError";
  }
}

function createTimeoutSignal(timeoutMs: number): {
  signal: AbortSignal;
  cancel: () => void;
} {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeout),
  };
}

function parseApiError(status: number, body: unknown): string {
  if (status >= 500) {
    return "The agent service is temporarily unavailable. Please try again.";
  }

  if (typeof body === "object" && body !== null && "error" in body) {
    const message = body.error;
    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  if (status === 404) {
    return "Agent endpoint not found. Please verify NEXT_PUBLIC_API_URL.";
  }

  if (status === 401 || status === 403) {
    return "The agent endpoint rejected the request.";
  }

  return "The request could not be completed. Please review the message and try again.";
}

export async function sendMessageToAgent(message: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl || baseUrl.trim().length === 0) {
    throw new ChatApiError(
      "Missing API configuration. Set NEXT_PUBLIC_API_URL in your environment.",
    );
  }

  const { signal, cancel } = createTimeoutSignal(REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      signal,
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      throw new ChatApiError(parseApiError(response.status, payload));
    }

    if (
      typeof payload === "object" &&
      payload !== null &&
      "reply" in payload &&
      typeof payload.reply === "string" &&
      payload.reply.trim().length > 0
    ) {
      return payload.reply;
    }

    throw new ChatApiError("The agent returned an invalid response format.");
  } catch (error) {
    if (error instanceof ChatApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ChatApiError(
        "Request timed out. The agent took too long to respond.",
      );
    }

    throw new ChatApiError(
      "Connection lost. Please check your network and try again.",
    );
  } finally {
    cancel();
  }
}
