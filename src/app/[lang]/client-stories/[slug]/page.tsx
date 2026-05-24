import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientStoryDetailView } from "@/components/sections/client-stories/ClientStoryDetailView";
import {
  clientStories,
  getClientStoryBySlug,
  getClientStoryContent,
} from "@/data/client-stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

type Props = Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale; slug: string }>> {
  const locales: Locale[] = ["de", "en"];
  return locales.flatMap((lang) => clientStories.map((story) => ({ lang, slug: story.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const story = getClientStoryBySlug(slug);
  if (!story) notFound();

  const content = getClientStoryContent(story, lang);
  const pathname = `/client-stories/${slug}`;
  const title = `${story.name} — ${SITE_NAME}`;

  return buildPageMetadata({
    locale: lang,
    pathname,
    title,
    description: content.metaDescription,
  });
}

export default async function ClientStoryPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const story = getClientStoryBySlug(slug);
  if (!story) notFound();

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="container-base">
          <ClientStoryDetailView locale={locale} dict={dict} story={story} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
