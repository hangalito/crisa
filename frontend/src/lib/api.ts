export type AuthError = {
    message: string;
    status?: number;
};

export async function requestOTP(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (response.status === 403) {
            return { success: false, error: "unauthorized" };
        }

        if (!response.ok) {
            const data = await response.json();
            return { success: false, error: data.detail || "Failed to send OTP" };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: "Network error" };
    }
}

export async function verifyOTP(email: string, code: string): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, error: data.detail || "Invalid code" };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: "Network error" };
    }
}

export async function logout(): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: "POST" });
}
