import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale }>> {
  return [{ lang: "en" }, { lang: "de" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        de: "/de",
        "x-default": `/${defaultLocale}`,
      },
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <div lang={lang} data-locale={lang} className="min-h-full flex flex-col">
      {children}
    </div>
  );
}

