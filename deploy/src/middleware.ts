import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./Middleware/withAuth"; // Sesuaikan path-nya

export function mainMiddleware(req: NextRequest) {
    return NextResponse.next();
}

// Di sinilah kamu mendaftarkan rute yang ingin diproteksi
export default withAuth(mainMiddleware, ["/profile", "/produk", "/about", "/admin" , "/editor"]);