import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("session_token")?.value;
    const { pathname } = request.nextUrl;

    // In cross-domain deployments, the auth cookie may exist only on the backend domain.
    // Enforcing protected-page redirects here can cause a login loop after OTP verification.
    // Route protection is handled client-side via /auth/me checks in the chat page.

    // If there's a token and user is on an auth-only page, redirect to home (chat)
    const isAuthOnlyPage = pathname === "/login" || pathname === "/verify" || pathname === "/unauthorized";
    if (token && isAuthOnlyPage) {
        return NextResponse.redirect(new URL("/chat", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
