import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";

type Props = Readonly<{
  params: Promise<{ lang: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale }>> {
  return [{ lang: "de" }, { lang: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const title = `${dict.legal.datenschutz.title} — ${dict.meta.title.split(" — ")[0]}`;

  return buildPageMetadata({
    locale: lang,
    pathname: "/datenschutz",
    title,
    description: dict.legal.datenschutz.sections[0]?.body.slice(0, 155) ?? dict.meta.description,
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="container-base">
          <LegalPageView locale={locale} dict={dict} page="datenschutz" />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
