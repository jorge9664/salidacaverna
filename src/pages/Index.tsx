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
import { AdBlockFinal } from "@/components/AdBlockFinal";
import MerchSection from "@/components/MerchSection";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";

const Index = ({ lang = "es" }: { lang?: Lang }) => {
  const { settings } = useSiteSettings();
  const { isAdmin } = useAuth();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  if (settings?.maintenance_mode && !isAdmin) {
    return <MaintenanceScreen message={settings.maintenance_message} />;
  }

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <LatestVideosSection />
        <MerchSection />
        <SocialSection />
        <ContactSection />
        <div className="container px-4">
          <AdBlockFinal />
        </div>
        <FooterSection />
      </div>
    </LanguageProvider>
  );
};

export default Index;
