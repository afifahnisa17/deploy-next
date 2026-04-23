import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = [],
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;

        if (requireAuth.some((path) => pathname.startsWith(path))) {
            const token: any = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET,
            });

            if (!token) {
                const url = new URL('/auth/login', req.url);
                url.searchParams.set('callbackUrl', req.url);
                return NextResponse.redirect(url);
            }

            // 1. Proteksi Halaman Admin: Benar-benar cuma Admin yang boleh
            if (
                hanyaAdmin.some((path) => pathname.startsWith(path)) &&
                token.role !== "admin"
            ) {
                return NextResponse.redirect(new URL('/', req.url));
            }

            // 2. Proteksi Halaman Editor: Admin BOLEH, Editor BOLEH, sisanya (member) TIDAK BOLEH
            if (hanyaEditor.some((path) => pathname.startsWith(path))) {
                if (token.role !== "admin" && token.role !== "editor") {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }
        }

        return middleware(req, next);
    };
}