import { Bot, Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
              NORTE <span className="text-gradient">DIGITAL</span>
            </h1>
            <p className="text-[10px] md:text-xs text-muted-foreground -mt-0.5">
              Soluções Digitais Inteligentes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground glass px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <Zap className="w-4 h-4 text-primary" />
            <span>Bot Ativo 24h</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
