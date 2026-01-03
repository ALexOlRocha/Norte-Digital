import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvestmentSection() {
  const whatsappNumber = "5511999825835";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de solicitar um orçamento personalizado.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="investimento" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Investimento
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            Sem mensalidades <span className="text-gradient">obrigatórias</span>
          </h2>

          {/* Value Props */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0" />
              <p className="text-lg text-foreground">Você não paga mensalidade obrigatória.</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0" />
              <p className="text-lg text-foreground">Você investe em um sistema que é seu.</p>
            </div>
          </div>

          {/* Message */}
          <div className="p-8 rounded-2xl glass mb-8">
            <p className="text-muted-foreground text-lg mb-4">
              Cada projeto é personalizado, mas nossos serviços partem de valores acessíveis 
              para quem quer crescer no digital.
            </p>
            <p className="text-foreground font-medium">
              👉 Solicite um orçamento e receba uma proposta clara, sem enrolação.
            </p>
          </div>

          {/* CTA */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="glow" size="xl" className="group">
              Quero meu orçamento agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
