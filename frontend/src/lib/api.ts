import api from "./axios";
import { isAxiosError } from "axios";

export type AuthError = {
    message: string;
    status?: number;
};

export async function requestOTP(email: string): Promise<{ success: boolean; error?: string }> {
    try {
        await api.post("/auth/request-otp", { email });
        return { success: true };
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response?.status === 403) {
                return { success: false, error: "unauthorized" };
            }
            return {
                success: false,
                error: err.response?.data?.detail || "Failed to send OTP",
            };
        }
        return { success: false, error: "Network error" };
    }
}

export async function verifyOTP(email: string, code: string): Promise<{ success: boolean; error?: string }> {
    try {
        await api.post("/auth/verify-otp", { email, code });
        return { success: true };
    } catch (err) {
        if (isAxiosError(err)) {
            return {
                success: false,
                error: err.response?.data?.detail || "Invalid code",
            };
        }
        return { success: false, error: "Network error" };
    }
}

export async function logout(): Promise<void> {
    try {
        await api.post("/auth/logout");
    } catch (err) {
        // Silently fail on logout
    }
}

export async function checkSession(): Promise<{ success: boolean; email?: string }> {
    try {
        const response = await api.get("/auth/me");
        return { success: true, email: response.data.email };
    } catch (err) {
        return { success: false };
    }
}

