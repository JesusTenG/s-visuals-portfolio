import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/work/WorkSection";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import { ImpactSnapshotSection } from "@/components/sections/impact-snapshot/ImpactSnapshotSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ClientStoriesSection } from "@/components/sections/client-stories/ClientStoriesSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/layout/Footer";

type Props = Readonly<{
  params: Promise<{ lang: string }>;
}>;

export default async function LangHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} introAnimation />
      <main className="flex-1">
        <HeroSection dict={dict} />
        <ImpactSnapshotSection dict={dict} locale={locale} />
        <WorkSection dict={dict} />
        <ServicesSection dict={dict} />
        <TestimonialSection locale={locale} dict={dict} />

        <ProcessSection dict={dict} />
        <ClientStoriesSection locale={locale} dict={dict} />
        <FinalCtaSection dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
