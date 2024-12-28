import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    // Cek apakah ada token di cookie dan user mencoba mengakses /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url)); // Redirect ke halaman utama jika tidak ada token
        }
    }

    return NextResponse.next(); // Lanjutkan permintaan jika ada token atau tidak ada di /dashboard
}

export const config = {
    matcher: ['/dashboard/:path*'],  // Hanya terapkan middleware di path /dashboard/*
};
