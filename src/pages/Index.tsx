import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FormatSection from "@/components/FormatSection";
import VideosSection from "@/components/VideosSection";
import ParticipateSection from "@/components/ParticipateSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FormatSection />
      <VideosSection />
      <ParticipateSection />
      <FooterSection />
    </div>
  );
};

export default Index;
