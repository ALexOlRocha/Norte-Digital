import { Building2, Briefcase, Store, Video, Zap, Clock, Headphones, TrendingUp, ArrowRight } from "lucide-react";

const audiences = [
  { icon: Building2, label: "Empresas que querem vender mais" },
  { icon: Briefcase, label: "Profissionais que prestam serviços" },
  { icon: Store, label: "Lojas físicas ou online" },
  { icon: Video, label: "Infoprodutores" },
  { icon: Zap, label: "Negócios que querem automação" },
];

const benefits = [
  { icon: Clock, label: "Parar de perder tempo" },
  { icon: Headphones, label: "Ter atendimento 24h" },
  { icon: TrendingUp, label: "Profissionalizar suas vendas" },
];

export function ForWhoSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
              Para Quem É
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              A Norte Digital é para <span className="text-gradient">você</span>
            </h2>
          </div>

          {/* Audiences Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {audiences.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 rounded-xl glass hover:bg-accent/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="p-8 rounded-2xl gradient-border bg-card text-center">
            <p className="text-lg text-muted-foreground mb-6">Se você quer:</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
                >
                  <benefit.icon className="w-4 h-4 text-accent" />
                  <span className="text-foreground font-medium">{benefit.label}</span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 text-accent font-semibold text-lg">
              <ArrowRight className="w-5 h-5" />
              Você está no lugar certo.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
