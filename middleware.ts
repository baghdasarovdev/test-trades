import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./utils/constants";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");

  if (!accessToken && req.nextUrl.pathname === '/watch-list') {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  if (accessToken && req.nextUrl.pathname === ROUTES.home) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/watch-list'],
};
