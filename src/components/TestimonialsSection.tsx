import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ricardo Mendes",
    role: "CEO, TechStore",
    content: "A automação implementada pela Norte Digital reduziu nosso tempo de processamento de pedidos em 70%. Simplesmente transformador para nosso e-commerce.",
    rating: 5,
  },
  {
    name: "Ana Paula Silva",
    role: "Diretora, Clínica Vida",
    content: "O sistema de agendamento online revolucionou nossa gestão. Eliminamos falhas humanas e aumentamos a satisfação dos pacientes.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo",
    role: "Fundador, LogisBR",
    content: "O dashboard desenvolvido nos dá visibilidade total das operações em tempo real. A tomada de decisão ficou muito mais ágil.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Empresas de diversos segmentos confiam na Norte Digital para suas soluções tecnológicas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl gradient-border bg-card hover:bg-muted/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/30 mb-4" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
