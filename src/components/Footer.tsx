import { Globe, Zap, Code2, Bot, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "5511999825835";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de solicitar um orçamento.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Tagline */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
                  <span className="text-accent font-display font-bold">N</span>
                </div>
                <span className="font-display font-bold text-lg text-foreground">
                  Norte<span className="text-accent">Digital</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Soluções digitais que apontam o caminho do crescimento.
              </p>
            </div>

            {/* Services */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-muted-foreground">
                <Globe className="w-3 h-3 text-accent" />
                Sites
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-muted-foreground">
                <Zap className="w-3 h-3 text-accent" />
                Automações
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-muted-foreground">
                <Code2 className="w-3 h-3 text-accent" />
                Sistemas
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-muted-foreground">
                <Bot className="w-3 h-3 text-accent" />
                PageBots
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Orçamento via WhatsApp
              </a>
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                Atendimento online
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/30">
            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#solucoes" className="hover:text-foreground transition-colors">Soluções</a>
              <a href="#como-funciona" className="hover:text-foreground transition-colors">Como Funciona</a>
              <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Norte Digital. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
