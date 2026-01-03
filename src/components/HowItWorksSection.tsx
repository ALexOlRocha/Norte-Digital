import { MessageSquare, Lightbulb, Code2, Bot, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Entendemos seu negócio",
    description: "Analisamos suas necessidades, processos e objetivos para entender como podemos ajudar.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Criamos a estratégia digital",
    description: "Desenvolvemos um plano personalizado com as melhores soluções para seu caso.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desenvolvemos o sistema",
    description: "Nossa equipe constrói a solução com foco em resultados e conversão.",
  },
  {
    number: "04",
    icon: Bot,
    title: "Automatizamos o atendimento",
    description: "Implementamos PageBots e automações que trabalham 24h por você.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Entregamos pronto para vender",
    description: "Você recebe um sistema completo, testado e pronto para gerar resultados.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Como Funciona
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Simples, direto e <span className="text-gradient">eficiente</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Do primeiro contato até a entrega, trabalhamos de forma transparente 
            e focada em resultados.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-accent/50 to-transparent" />
              )}
              
              <div className="text-center">
                {/* Number & Icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl glass flex items-center justify-center group-hover:glow-subtle transition-all duration-300">
                    <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full border border-accent/30">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
