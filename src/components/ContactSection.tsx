import { MessageCircle, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const whatsappNumber = "5511999825835";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de solicitar um orçamento.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contato" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Main CTA Card */}
          <div className="p-8 md:p-12 rounded-2xl glass glow-subtle text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
              Contato
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Fale com a <span className="text-gradient">Norte Digital</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Solicite seu orçamento via WhatsApp e receba uma proposta personalizada 
              para transformar seu digital em um sistema de vendas.
            </p>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="glow" size="xl" className="group">
                Solicitar orçamento via WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <p className="text-sm text-muted-foreground mt-6">
              Resposta rápida • Sem compromisso • Proposta clara
            </p>

            {/* Online Badge */}
            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-border/30">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Atendimento 100% online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
