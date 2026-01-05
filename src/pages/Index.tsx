import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { TruthSection } from "@/components/TruthSection";
import { AnalogySection } from "@/components/AnalogySection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ForWhoSection } from "@/components/ForWhoSection";
import { InvestmentSection } from "@/components/InvestmentSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CtaSection } from "@/components/CtaSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import Chatbot from "@/components/chatBot";
import Pagebot from "@/components/pageBot";
import Portfolio from "@/components/PortifolioLP";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <Pagebot />
      <Chatbot />
      <ProblemSection />
      <TruthSection />
      <AnalogySection />
      <SolutionsSection />
      <HowItWorksSection />
      <ForWhoSection />
      <InvestmentSection />
      <TestimonialsSection />
      <CtaSection />
      <Portfolio />
      <ContactSection />

      <Footer />
    </div>
  );
};

export default Index;
