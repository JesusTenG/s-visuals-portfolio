import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { negotiateLocaleFromAcceptLanguage } from "@/i18n/negotiate-locale";

export default async function Home() {
  const headerList = await headers();
  const locale = negotiateLocaleFromAcceptLanguage(headerList.get("accept-language"));
  redirect(`/${locale}`);
}
