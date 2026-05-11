import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkCaseDetailView } from "@/components/sections/work/WorkCaseDetailView";
import { getWorkCaseBySlug, workCases } from "@/data/work-cases";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale; slug: string }>> {
  const locales: Locale[] = ["en", "de"];
  return locales.flatMap((lang) => workCases.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const workCase = getWorkCaseBySlug(slug);
  if (!workCase) notFound();

  const dict = await getDictionary(lang);
  const siteName = dict.meta.title.split(" — ")[0] ?? "Simon Saad Visuals";

  return {
    title: `${workCase.title} — ${siteName}`,
    description: workCase.description,
    alternates: {
      canonical: `/${lang}/work/${slug}`,
    },
  };
}

export default async function WorkCasePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const workCase = getWorkCaseBySlug(slug);
  if (!workCase) notFound();

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="container-base">
          <WorkCaseDetailView locale={locale} dict={dict} workCase={workCase} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
