import {
  ArrowRight,
  Sparkles,
  Bot,
  Globe,
  Zap,
  Code2,
  Chrome,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const whatsappNumber = "5511999825835";
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="w-full h-auto">
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center hero-gradient overflow-hidden py-35 px-4">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-[10%] animate-float opacity-20">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div
          className="absolute top-1/3 right-[15%] animate-float opacity-20"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Code className="w-7 h-7 text-primary" />
          </div>
        </div>
        <div
          className="absolute bottom-1/3 left-[20%] animate-float opacity-20"
          style={{ animationDelay: "4s" }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-20 lg:pt-0 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Automação, Sites Inteligentes e Sistemas que Vendem por Você
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-display text-4xl sm:text-5xl md:text-4xl  lg:text5xl font-bold leading-tight mb-6 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Seu negócio não precisa de mais um site.{" "}
                <span className="text-gradient ">
                  Precisa de um sistema que gere vendas.
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-lg sm:text-xl text-muted-foreground mb-8 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Transformamos presença digital em sistema de vendas. Não criamos
                apenas sites. Criamos experiências automatizadas que atendem,
                explicam, qualificam e convertem clientes 24h por dia.
              </p>

              {/* Services Tags */}
              <div
                className="flex flex-wrap gap-3 mb-10 animate-fade-up"
                style={{ animationDelay: "0.25s" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
                  <Globe className="w-3.5 h-3.5" />
                  Sites
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
                  <Bot className="w-3.5 h-3.5" />
                  PageBots
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
                  <Zap className="w-3.5 h-3.5" />
                  Automações
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
                  <Code2 className="w-3.5 h-3.5" />
                  Sistemas Web
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
                  <Chrome className="w-3.5 h-3.5" />
                  Extensões Chrome
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="glow"
                    size="xl"
                    className="group w-full sm:w-auto rounded-full px-8"
                  >
                    Quero um orçamento
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#solucoes">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto bg-white/40 rounded-full px-8"
                  >
                    Ver Soluções
                  </Button>
                </a>
              </div>

      
              {/* Tagline */}
              <p
                className="text-accent font-semibold mt-8 animate-fade-up"
                style={{ animationDelay: "0.5s" }}
              >
                👉 Menos esforço. Mais conversões.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full max-w-[500px] h-full bg-transparent overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/NorteDigital.png"
                  alt="Dashboard Norte Digital"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </section>
  );
}
