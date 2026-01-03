import { Sparkles, Target, Heart } from "lucide-react";

export function TruthSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
              A Verdade
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              A Apple não vende <span className="text-gradient">barato</span>.
            </h2>
            <p className="text-xl text-muted-foreground">
              E não vende apenas tecnologia.
            </p>
          </div>

          {/* What Apple Sells */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-2xl glass group hover:glow-subtle transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Experiência</h3>
            </div>
            <div className="text-center p-6 rounded-2xl glass group hover:glow-subtle transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Posicionamento</h3>
            </div>
            <div className="text-center p-6 rounded-2xl glass group hover:glow-subtle transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Heart className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Desejo</h3>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center p-8 rounded-2xl gradient-border bg-card">
            <p className="text-lg text-muted-foreground mb-4">
              O que faz a diferença não é o preço,
              <br />
              <span className="text-foreground font-semibold text-xl">é como o produto é apresentado.</span>
            </p>
            
            <div className="h-px w-24 bg-accent/30 mx-auto my-6" />

            <p className="text-muted-foreground">
              Seu negócio pode ser excelente.
              <br />
              Mas sem estratégia, sem automação e sem condução do cliente,
              <br />
              <span className="text-accent font-semibold">você depende da sorte.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
