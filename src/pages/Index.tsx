import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LatestVideosSection from "@/components/LatestVideosSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import AdSlot from "@/components/AdSlot";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";

const Index = ({ lang = "es" }: { lang?: Lang }) => {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <LatestVideosSection />
        <SocialSection />
        <ContactSection />
        <div className="container px-4">
          <AdSlot slot="0000000000" />
        </div>
        <FooterSection />
      </div>
    </LanguageProvider>
  );
};

export default Index;
