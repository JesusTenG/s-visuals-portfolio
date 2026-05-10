import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorkSection } from "@/components/sections/WorkSection";
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
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">
        <HeroSection dict={dict} />
        <MetricsSection dict={dict} />
        <ServicesSection dict={dict} />
        <ProcessSection dict={dict} />
        <WorkSection dict={dict} />
        <FinalCtaSection dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}

