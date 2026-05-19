import { NextRequest, NextResponse } from "next/server";

import { negotiateLocaleFromAcceptLanguage } from "@/i18n/negotiate-locale";

export function middleware(request: NextRequest) {
  const locale = negotiateLocaleFromAcceptLanguage(
    request.headers.get("accept-language"),
  );

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
