import { Bot, Globe, Zap, LayoutDashboard, Puzzle, Chrome, MessageCircle, Target, FileCheck, Sparkles, ClipboardList, Lightbulb } from "lucide-react";

const mainSolutions = [
  {
    icon: Bot,
    title: "PageBots Inteligentes",
    description: "Chatbots personalizados que apresentam produtos, tiram dúvidas, qualificam leads e encaminham para orçamento. Tudo integrado ao seu site.",
    features: ["Apresentam produtos e serviços", "Tiram dúvidas automaticamente", "Qualificam leads", "Encaminham para fechamento"],
  },
  {
    icon: Globe,
    title: "Sites e Landing Pages que Convertem",
    description: "Design moderno e estratégico com foco em conversão, não só estética. Estrutura pensada para guiar o cliente.",
    features: ["Design moderno e estratégico", "Foco em conversão", "Estrutura para guiar o cliente"],
  },
  {
    icon: Zap,
    title: "Automações Web e Extensões Chrome",
    description: "Automação de tarefas repetitivas, integração com sistemas web e redução de tempo e erros manuais.",
    features: ["Automação de tarefas repetitivas", "Integração com sistemas web", "Redução de tempo e erros manuais"],
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas Simples e MVPs",
    description: "Gerenciamento básico, sistemas personalizados e MVPs rápidos para validar ideias de negócio.",
    features: ["Gerenciamento básico", "Sistemas personalizados", "MVPs rápidos para validar ideias"],
  },
];

const customSolutions = [
  { icon: ClipboardList, label: "Cardápios digitais" },
  { icon: Target, label: "Quizzes para infoprodutores" },
  { icon: FileCheck, label: "Páginas únicas de conversão" },
  { icon: MessageCircle, label: "Formulários para eventos" },
  { icon: Lightbulb, label: "Projetos criativos sob demanda" },
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            A Solução
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Sistemas digitais <span className="text-gradient">sob medida</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A Norte Digital cria sistemas digitais sob medida para negócios que querem 
            vender mais e depender menos de esforço manual.
          </p>
        </div>

        {/* Main Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mainSolutions.map((solution) => (
            <div
              key={solution.title}
              className="group p-6 rounded-2xl gradient-border bg-card hover:bg-muted/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <solution.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {solution.description}
                  </p>
                  <ul className="space-y-1">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solutions */}
        <div className="p-8 rounded-2xl glass text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Puzzle className="w-6 h-6 text-accent" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Soluções Personalizadas
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {customSolutions.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-foreground"
              >
                <item.icon className="w-4 h-4 text-accent" />
                {item.label}
              </div>
            ))}
          </div>

          <p className="text-accent font-semibold">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Se é digital, a gente cria.
          </p>
        </div>
      </div>
    </section>
  );
}
