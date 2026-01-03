import { Award, Package, Headphones, MapPin, Users, Navigation, ArrowRight } from "lucide-react";

export function AnalogySection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
              A Analogia
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Você pode ter tudo...
            </h2>
          </div>

          {/* What You Have */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 rounded-2xl glass">
              <Award className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="text-foreground font-medium">O melhor serviço</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass">
              <Package className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="text-foreground font-medium">O melhor produto</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass">
              <Headphones className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="text-foreground font-medium">O melhor atendimento</p>
            </div>
          </div>

          {/* But... */}
          <div className="text-center p-8 rounded-2xl bg-accent/5 border border-accent/20 mb-12">
            <p className="text-xl text-muted-foreground mb-2">
              Mas se estiver pescando no lago errado,
            </p>
            <p className="text-2xl font-display font-bold text-foreground">
              não vai vender.
            </p>
          </div>

          {/* What You Need */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg mb-6">No digital, você precisa:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl gradient-border bg-card text-center group hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <p className="text-foreground font-medium">Estar onde os clientes estão</p>
            </div>
            <div className="p-6 rounded-2xl gradient-border bg-card text-center group hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <p className="text-foreground font-medium">Abordar da forma certa</p>
            </div>
            <div className="p-6 rounded-2xl gradient-border bg-card text-center group hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Navigation className="w-6 h-6 text-accent" />
              </div>
              <p className="text-foreground font-medium">Guiar a decisão de compra</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-lg">
              <ArrowRight className="w-5 h-5" />
              É isso que a Norte Digital faz.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
