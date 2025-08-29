import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile",];
const authPages = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (token) {
        if (authPages.some((p) => pathname.startsWith(p))) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    } else {
        if (protectedRoutes.some((p) => pathname.startsWith(p))) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/profile/:path*",
        // "/topics/:path*",
    ],
};
