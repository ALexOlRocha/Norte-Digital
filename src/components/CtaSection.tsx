import { ArrowRight, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const whatsappNumber = "5511999825835";
  const whatsappMessage = encodeURIComponent("Olá! Quero transformar meu digital em um sistema de vendas.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Stop Messages */}
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-400/10 border border-red-400/20 text-red-400">
              <XCircle className="w-4 h-4" />
              <span>Pare de depender da sorte</span>
            </div>
            <div className="block" />
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-400/10 border border-red-400/20 text-red-400">
              <XCircle className="w-4 h-4" />
              <span>Pare de responder tudo manualmente</span>
            </div>
            <div className="block" />
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-400/10 border border-red-400/20 text-red-400">
              <XCircle className="w-4 h-4" />
              <span>Pare de perder vendas</span>
            </div>
          </div>

          {/* Main Message */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            Transforme seu digital em um{" "}
            <span className="text-gradient">sistema de vendas</span>
          </h2>

          {/* CTA */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="glow" size="xl" className="group">
              Fale com a Norte Digital
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
