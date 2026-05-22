import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, type Locale } from "@/i18n/config";
import { negotiateLocaleFromAcceptLanguage } from "@/i18n/negotiate-locale";
import { LOCALE_HEADER } from "@/lib/locale-header";

function localeFromPathname(pathname: string): Locale | null {
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = negotiateLocaleFromAcceptLanguage(
      request.headers.get("accept-language"),
    );
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const locale = localeFromPathname(pathname) ?? defaultLocale;
  const response = NextResponse.next();
  response.headers.set(LOCALE_HEADER, locale);
  return response;
}

export const config = {
  matcher: ["/", "/de", "/de/:path*", "/en", "/en/:path*"],
};
