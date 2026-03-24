import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GuestsSection from "@/components/GuestsSection";
import EpisodesSection from "@/components/EpisodesSection";
import ClipsSection from "@/components/ClipsSection";
import ParticipateSection from "@/components/ParticipateSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GuestsSection />
      <EpisodesSection />
      <ClipsSection />
      <ParticipateSection />
      <FooterSection />
    </div>
  );
};

export default Index;
