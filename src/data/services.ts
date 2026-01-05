export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  priceNote?: string;
  category:
    | "automacoes"
    | "sites"
    | "chatbots"
    | "landing-pages"
    | "consultoria";
  features: string[];
  isPopular?: boolean;
  deliveryTime?: string;
}

export const services: Service[] = [
  // Automações
  {
    id: "1",
    name: "Automação de WhatsApp",
    description:
      "Automatize seu atendimento no WhatsApp com IA e fluxos inteligentes",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=300&fit=crop",
    price: "A partir de R$ 997",
    category: "automacoes",
    features: [
      "Respostas automáticas",
      "Fluxos personalizados",
      "Integração com CRM",
      "Relatórios",
    ],
    isPopular: true,
    deliveryTime: "7-15 dias",
  },
  {
    id: "2",
    name: "Automação de E-mail Marketing",
    description:
      "Sequências de e-mail automatizadas para nutrir leads e converter vendas",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    price: "A partir de R$ 697",
    category: "automacoes",
    features: [
      "Sequências ilimitadas",
      "Segmentação",
      "A/B Testing",
      "Analytics",
    ],
    deliveryTime: "5-10 dias",
  },
  {
    id: "3",
    name: "Automação de Processos",
    description: "Conecte suas ferramentas e automatize tarefas repetitivas",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    price: "A partir de R$ 1.497",
    category: "automacoes",
    features: [
      "Integração de APIs",
      "Zapier/Make",
      "Fluxos customizados",
      "Suporte dedicado",
    ],
    deliveryTime: "10-20 dias",
  },

  // Sites
  {
    id: "4",
    name: "Site Institucional",
    description: "Site profissional para apresentar sua empresa e serviços",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    price: "A partir de R$ 1.997",
    category: "sites",
    features: ["Design moderno", "Responsivo", "SEO otimizado", "Painel admin"],
    isPopular: true,
    deliveryTime: "15-30 dias",
  },
  {
    id: "5",
    name: "E-commerce Completo",
    description: "Loja virtual pronta para vender seus produtos online",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    price: "A partir de R$ 3.997",
    category: "sites",
    features: [
      "Carrinho de compras",
      "Pagamentos integrados",
      "Gestão de estoque",
      "Dashboard",
    ],
    deliveryTime: "30-45 dias",
  },

  // Chatbots
  {
    id: "6",
    name: "Chatbot com IA",
    description: "Assistente virtual inteligente para seu site ou WhatsApp",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
    price: "A partir de R$ 1.297",
    category: "chatbots",
    features: [
      "IA conversacional",
      "Treinamento customizado",
      "Multi-canal",
      "Analytics",
    ],
    isPopular: true,
    deliveryTime: "10-15 dias",
  },
  {
    id: "7",
    name: "Bot de Atendimento",
    description:
      "Chatbot para qualificar leads e agendar reuniões automaticamente",
    image:
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&h=300&fit=crop",
    price: "A partir de R$ 897",
    category: "chatbots",
    features: [
      "Qualificação de leads",
      "Agendamento automático",
      "Integração calendário",
      "Notificações",
    ],
    deliveryTime: "7-12 dias",
  },

  // Landing Pages
  {
    id: "8",
    name: "Landing Page de Alta Conversão",
    description: "Página focada em conversão para suas campanhas de marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    price: "A partir de R$ 697",
    category: "landing-pages",
    features: [
      "Copy persuasiva",
      "Design otimizado",
      "A/B testing",
      "Pixels de rastreio",
    ],
    isPopular: true,
    deliveryTime: "5-7 dias",
  },
  {
    id: "9",
    name: "Página de Vendas",
    description: "Página de vendas completa para infoprodutos ou serviços",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    price: "A partir de R$ 1.297",
    category: "landing-pages",
    features: [
      "VSL integrada",
      "Checkout otimizado",
      "Upsell/Downsell",
      "Garantia visual",
    ],
    deliveryTime: "7-15 dias",
  },

  // Consultoria
  {
    id: "10",
    name: "Consultoria Digital",
    description: "Análise completa do seu negócio digital com plano de ação",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
    price: "A partir de R$ 497",
    category: "consultoria",
    features: [
      "Análise completa",
      "Plano estratégico",
      "Recomendações",
      "1h de call",
    ],
    deliveryTime: "3-5 dias",
  },
];

export const getServicesByCategory = (category: string): Service[] => {
  if (category === "todos") return services;
  return services.filter((service) => service.category === category);
};

export const getPopularServices = (): Service[] => {
  return services.filter((service) => service.isPopular);
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
