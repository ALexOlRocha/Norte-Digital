import { Clock, Zap, Shield } from "lucide-react";
import Header from "./chat/header";
import ChatContainer from "./chat/chatContainer";

const Pagebot = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(175, 70%, 35%) 1px, transparent 1px), linear-gradient(90deg, hsl(175, 70%, 35%) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" />
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-6 relative z-10">
        {/* Tagline */}
        <div className="text-center mb-4 md:mb-6 animate-fade-in">
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Automatize. Escale.{" "}
            <span className="inline-block text-gradient">Venda mais.</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções digitais que trabalham 24h para transformar visitantes em
            clientes
          </p>
        </div>

        {/* Chat Container */}
        <div className="w-full max-w-5xl h-[calc(100vh-220px)] md:h-[620px] animate-slide-up">
          <ChatContainer />
        </div>

        {/* Trust badges */}
        <div
          className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-primary" />
            24/7 Disponível
          </span>
          <span className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            Respostas Rápidas
          </span>
          <span className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-primary" />
            Suporte Escalável
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground relative z-10 border-t border-border/20">
        <p>© 2024 Norte Digital • Transformando negócios com tecnologia</p>
      </footer>
    </div>
  );
};

export default Pagebot;
