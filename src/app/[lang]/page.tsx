import { notFound } from "next/navigation";

import { HeroVisualModeProvider } from "@/components/hero/HeroVisualModeProvider.client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSnapshotSection } from "@/components/sections/impact-snapshot/ImpactSnapshotSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ClientStoriesSection } from "@/components/sections/client-stories/ClientStoriesSection";
import { WorkSection } from "@/components/sections/work/WorkSection";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildFaqJsonLd, buildHomeJsonLd } from "@/lib/structured-data";

type Props = Readonly<{
  params: Promise<{ lang: string }>;
}>;

export default async function LangHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const dict = await getDictionary(locale);

  const jsonLd = [...buildHomeJsonLd(locale, dict), buildFaqJsonLd(dict)];

  return (
    <HeroVisualModeProvider>
      <JsonLd data={jsonLd} />
      <Navbar locale={locale} dict={dict} introAnimation />
      <main className="flex-1">
        <HeroSection dict={dict} />
        <ServicesSection dict={dict} />
        <WorkSection dict={dict} />
        <ImpactSnapshotSection dict={dict} locale={locale} />
        <ApproachSection dict={dict} />
        <ProcessSection dict={dict} />
        <TestimonialSection locale={locale} dict={dict} />
        <ClientStoriesSection locale={locale} dict={dict} />
        <FaqSection dict={dict} />
        <FinalCtaSection dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </HeroVisualModeProvider>
  );
}
