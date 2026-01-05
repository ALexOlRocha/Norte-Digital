import { useState, useRef, useEffect } from "react";

import { Bot, RotateCcw, Zap } from "lucide-react";
import {
  getPopularServices,
  getServicesByCategory,
  Service,
} from "@/data/services";
import ChatBubble from "./chatBubble";
import ChatInput from "./chatInput";
import PersistentMenu from "./persistentMenu";
import WhatsAppButton from "./whatsAppButton";
import TypingIndicator from "./typingIndicator";
import ServiceCarousel from "./serviceCarousel";
import QuickReplies from "./quickReplies";

type ChatStep =
  | "welcome"
  | "category"
  | "show-services"
  | "service-selected"
  | "ask-name"
  | "ask-project"
  | "ask-need"
  | "confirm-data"
  | "ready-to-contact"
  | "contact-human";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  services?: Service[];
  quickReplies?: { id: string; label: string; icon?: string }[];
  showWhatsApp?: boolean;
  whatsAppMessage?: string;
}

interface LeadData {
  name?: string;
  projectName?: string;
  need?: string;
  service?: Service;
}

const COMPANY_NAME = "Norte Digital";
const WHATSAPP_NUMBER = "5511999999999";

// Greeting patterns
const GREETING_PATTERNS = [
  /^(oi|olá|ola|hey|hi|hello|e ai|eai|bom dia|boa tarde|boa noite|oie|oii|oiii|opa|fala|salve)/i,
];

// Intent patterns
const INTENT_PATTERNS = {
  automacao:
    /automa[çc][aã]o|automat|integra[çc][aã]o|zapier|make|n8n|api|processo/i,
  site: /site|website|p[aá]gina|portal|institucional|web/i,
  chatbot:
    /chatbot|bot|assistente|ia|intelig[êe]ncia artificial|atendimento autom/i,
  landingPage:
    /landing|lan[çc]amento|p[aá]gina de vendas|captura|convers[aã]o/i,
  ecommerce: /loja|e-commerce|ecommerce|vender online|vendas online/i,
  consultoria: /consultoria|ajuda|orienta[çc][aã]o|an[aá]lise|diagn[oó]stico/i,
  orcamento: /or[çc]amento|pre[çc]o|valor|quanto custa|invest|proposta/i,
  atendente: /atendente|humano|falar|pessoa|suporte|especialista/i,
  popular: /popular|mais vendido|recomenda|melhor|indica/i,
  ajuda: /ajuda|help|socorro|n[aã]o sei|d[uú]vida|n[aã]o entendi/i,
  cancelar: /cancelar|voltar|sair|parar|menu|inicio|começar/i,
};

// FAQ patterns
const FAQ_PATTERNS = {
  fazSites: /voc[eê]s fazem sites?|fazem site|criam sites?|desenvolvem sites?/i,
  fazLanding: /fazem landing|criam landing|desenvolvem landing/i,
  comoFunciona: /como funciona|como [eé] o processo|qual [eé] o processo/i,
  prazo: /prazo|quanto tempo|demora|entrega/i,
  pagamento: /pagamento|como pago|forma de pagamento|pagar|parcelamento/i,
  localizacao: /onde fica|localiza[çc][aã]o|endere[çc]o|cidade/i,
  suporte: /suporte|ajuda p[oó]s|garantia|manuten[çc][aã]o/i,
  servicos:
    /quais servi[çc]os|o que fazem|servi[çc]os oferecem|que voc[eê]s fazem/i,
};

const isGreeting = (message: string): boolean => {
  const cleaned = message.trim().toLowerCase();
  return GREETING_PATTERNS.some((pattern) => pattern.test(cleaned));
};

const detectIntent = (message: string): string | null => {
  const cleaned = message.trim().toLowerCase();
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(cleaned)) return intent;
  }
  return null;
};

const detectFAQ = (message: string): string | null => {
  const cleaned = message.trim().toLowerCase();
  for (const [faq, pattern] of Object.entries(FAQ_PATTERNS)) {
    if (pattern.test(cleaned)) return faq;
  }
  return null;
};

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<ChatStep>("welcome");
  const [leadData, setLeadData] = useState<LeadData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setTimeout(() => {
      addBotMessage(
        `👋 Olá! Seja bem-vindo(a) à ${COMPANY_NAME}!\n\nSomos especialistas em soluções digitais que transformam negócios.\n\nComo posso te ajudar hoje?`,
        [
          { id: "automacoes", label: "Automações", icon: "⚡" },
          { id: "sites", label: "Sites", icon: "🌐" },
          { id: "chatbots", label: "Chatbots", icon: "🤖" },
          { id: "landing-pages", label: "Landing Pages", icon: "📄" },
          { id: "consultoria", label: "Consultoria", icon: "💡" },
          { id: "atendente", label: "Falar com especialista", icon: "👨‍💻" },
        ]
      );
      setCurrentStep("category");
    }, 800);
  }, []);

  const addBotMessage = (
    text: string,
    quickReplies?: { id: string; label: string; icon?: string }[],
    services?: Service[],
    showWhatsApp?: boolean,
    whatsAppMessage?: string
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          isBot: true,
          quickReplies,
          services,
          showWhatsApp,
          whatsAppMessage,
        },
      ]);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, isBot: false },
    ]);
  };

  const showMainCategories = () => {
    addBotMessage("Em qual área posso te ajudar?", [
      { id: "automacoes", label: "Automações", icon: "⚡" },
      { id: "sites", label: "Sites", icon: "🌐" },
      { id: "chatbots", label: "Chatbots", icon: "🤖" },
      { id: "landing-pages", label: "Landing Pages", icon: "📄" },
      { id: "consultoria", label: "Consultoria", icon: "💡" },
      { id: "atendente", label: "Falar com especialista", icon: "👨‍💻" },
    ]);
    setCurrentStep("category");
  };

  const handleFAQ = (faqType: string) => {
    const faqResponses: Record<string, string> = {
      fazSites: `Sim! 🌐 Criamos sites profissionais e modernos.\n\nDesenvolvemos desde sites institucionais até e-commerces completos.\n\nQuer ver nossas opções de sites?`,
      fazLanding: `Com certeza! 📄 Landing pages de alta conversão é uma das nossas especialidades.\n\nCriamos páginas focadas em capturar leads e vender.\n\nQuer conhecer nossos pacotes?`,
      comoFunciona: `Nosso processo é simples:\n\n1️⃣ Você nos conta sua necessidade\n2️⃣ Analisamos e enviamos uma proposta\n3️⃣ Após aprovação, iniciamos o projeto\n4️⃣ Entregas com acompanhamento\n5️⃣ Suporte pós-entrega\n\nQuer fazer um orçamento agora?`,
      prazo: `⏱️ Os prazos variam conforme o projeto:\n\n• Landing Pages: 5-7 dias\n• Sites Institucionais: 15-30 dias\n• E-commerces: 30-45 dias\n• Automações: 7-20 dias\n• Chatbots: 10-15 dias\n\nQuer saber o prazo do seu projeto?`,
      pagamento: `💳 Facilitamos ao máximo!\n\n• PIX com desconto\n• Cartão em até 12x\n• Boleto\n• 50% entrada + 50% na entrega\n\nQuer fazer um orçamento?`,
      localizacao: `📍 Somos uma empresa 100% digital!\n\nAtendemos todo o Brasil de forma remota, com reuniões online e suporte via WhatsApp.\n\nQuer falar com um especialista?`,
      suporte: `🛡️ Oferecemos suporte completo!\n\n• Garantia de 30 dias\n• Suporte técnico\n• Treinamento de uso\n• Manutenção mensal (opcional)\n\nQuer saber mais sobre nossos serviços?`,
      servicos: `🚀 Oferecemos soluções digitais completas:\n\n⚡ Automações de processos\n🌐 Sites e E-commerces\n🤖 Chatbots com IA\n📄 Landing Pages\n💡 Consultoria Digital\n\nQual área te interessa mais?`,
    };

    const response =
      faqResponses[faqType] ||
      "Boa pergunta! Me conta mais sobre o que você precisa.";

    addBotMessage(response, [
      { id: "ver-servicos", label: "Ver serviços", icon: "📦" },
      { id: "fazer-orcamento", label: "Fazer orçamento", icon: "💰" },
      { id: "atendente", label: "Falar com especialista", icon: "👨‍💻" },
    ]);
    setCurrentStep("category");
  };

  const startQuoteFlow = (service?: Service) => {
    setLeadData((prev) => ({ ...prev, service }));
    addBotMessage(
      `Perfeito! 😊 Para preparar seu orçamento personalizado, preciso de algumas informações.\n\nPrimeiro, me diga: qual é o seu nome?\n\n💡 *Dica: Use o menu ☰ a qualquer momento para navegar*`
    );
    setCurrentStep("ask-name");
  };

  const handleNotUnderstood = () => {
    addBotMessage(
      `Hmm, não consegui entender exatamente o que você precisa 🤔\n\nPosso te ajudar de algumas formas:\n\n📦 Ver nossos serviços\n💰 Fazer um orçamento\n👨‍💻 Falar com um especialista\n\nO que prefere?`,
      [
        { id: "ver-servicos", label: "Ver serviços", icon: "📦" },
        { id: "fazer-orcamento", label: "Fazer orçamento", icon: "💰" },
        { id: "atendente", label: "Encaminhar para atendente", icon: "👨‍💻" },
      ]
    );
    setCurrentStep("category");
  };

  const handleSendMessage = (message: string) => {
    addUserMessage(message);

    // Check for cancel/back intent first - works in any step
    const intent = detectIntent(message);
    if (intent === "cancelar") {
      setLeadData({});
      showMainCategories();
      return;
    }

    // Check for help intent - works in any step
    if (intent === "ajuda") {
      handleNotUnderstood();
      return;
    }

    // Check for attendant intent - works in any step
    if (intent === "atendente") {
      handleContactHuman();
      return;
    }

    // Handle quote flow steps - but still allow breaking out
    if (currentStep === "ask-name") {
      // Check if user wants to do something else
      if (intent && intent !== "orcamento") {
        handleIntentRedirect(intent);
        return;
      }
      // Check FAQ
      const faqType = detectFAQ(message);
      if (faqType) {
        setTimeout(() => handleFAQ(faqType), 500);
        return;
      }
      // Normal flow - save name
      setLeadData((prev) => ({ ...prev, name: message }));
      setTimeout(() => {
        addBotMessage(
          `Prazer, ${message}! 🤝\n\nAgora me conta: qual é o nome do seu projeto ou empresa?`
        );
        setCurrentStep("ask-project");
      }, 500);
      return;
    }

    if (currentStep === "ask-project") {
      // Check if user wants to do something else
      if (intent && intent !== "orcamento") {
        handleIntentRedirect(intent);
        return;
      }
      // Check FAQ
      const faqType = detectFAQ(message);
      if (faqType) {
        setTimeout(() => handleFAQ(faqType), 500);
        return;
      }
      // Normal flow - save project
      setLeadData((prev) => ({ ...prev, projectName: message }));
      setTimeout(() => {
        addBotMessage(
          `Ótimo! "${message}" parece um projeto interessante! 💡\n\nAgora descreva brevemente sua necessidade ou o problema que deseja resolver:`
        );
        setCurrentStep("ask-need");
      }, 500);
      return;
    }

    if (currentStep === "ask-need") {
      // Check if user wants to do something else
      if (intent && intent !== "orcamento") {
        handleIntentRedirect(intent);
        return;
      }
      // Check FAQ
      const faqType = detectFAQ(message);
      if (faqType) {
        setTimeout(() => handleFAQ(faqType), 500);
        return;
      }
      // Normal flow - save need and finalize
      setLeadData((prev) => ({ ...prev, need: message }));
      const updatedLead = { ...leadData, need: message };

      const whatsappMessage = `Olá! Vim pelo site da ${COMPANY_NAME}.

👤 *Nome:* ${updatedLead.name}
🏢 *Projeto/Empresa:* ${updatedLead.projectName}
📋 *Necessidade:* ${updatedLead.need}
${updatedLead.service ? `📦 *Serviço:* ${updatedLead.service.name}` : ""}

Gostaria de receber um orçamento. 😊`;

      setTimeout(() => {
        addBotMessage(
          `Perfeito! 🎯 Já tenho todas as informações.\n\n*Resumo do seu pedido:*\n\n👤 Nome: ${
            updatedLead.name
          }\n🏢 Projeto: ${updatedLead.projectName}\n📋 Necessidade: ${
            updatedLead.need
          }${
            updatedLead.service
              ? `\n📦 Serviço: ${updatedLead.service.name}`
              : ""
          }\n\nClique abaixo para finalizar no WhatsApp e receber sua proposta:`,
          [
            {
              id: "novo-orcamento",
              label: "Fazer outro orçamento",
              icon: "🔄",
            },
            { id: "ver-servicos", label: "Ver serviços", icon: "📦" },
          ],
          undefined,
          true,
          whatsappMessage
        );
        setCurrentStep("ready-to-contact");
      }, 500);
      return;
    }

    // Check for greeting first
    if (isGreeting(message)) {
      setTimeout(() => {
        addBotMessage(
          `Oi! 😊 Que bom ter você aqui!\n\nSou o assistente virtual da ${COMPANY_NAME}. Estou pronto para te ajudar a encontrar a solução digital perfeita.\n\nO que você está precisando?`,
          [
            { id: "automacoes", label: "Automações", icon: "⚡" },
            { id: "sites", label: "Sites", icon: "🌐" },
            { id: "chatbots", label: "Chatbots", icon: "🤖" },
            { id: "landing-pages", label: "Landing Pages", icon: "📄" },
            { id: "ver-populares", label: "Ver mais populares", icon: "🔥" },
          ]
        );
        setCurrentStep("category");
      }, 500);
      return;
    }

    // Check for FAQ
    const faqType = detectFAQ(message);
    if (faqType) {
      setTimeout(() => handleFAQ(faqType), 500);
      return;
    }

    // Handle intents
    if (intent) {
      handleIntentRedirect(intent);
    } else {
      // Didn't understand - offer help
      setTimeout(() => handleNotUnderstood(), 500);
    }
  };

  const handleIntentRedirect = (intent: string) => {
    switch (intent) {
      case "automacao":
        handleCategorySelection("automacoes");
        break;
      case "site":
      case "ecommerce":
        handleCategorySelection("sites");
        break;
      case "chatbot":
        handleCategorySelection("chatbots");
        break;
      case "landingPage":
        handleCategorySelection("landing-pages");
        break;
      case "consultoria":
        handleCategorySelection("consultoria");
        break;
      case "orcamento":
        startQuoteFlow();
        break;
      case "popular":
        handleShowPopular();
        break;
      case "atendente":
        handleContactHuman();
        break;
      default:
        showMainCategories();
    }
  };

  const handleCategorySelection = (categoryId: string) => {
    const categoryNames: Record<string, string> = {
      automacoes: "Automações",
      sites: "Sites e E-commerces",
      chatbots: "Chatbots com IA",
      "landing-pages": "Landing Pages",
      consultoria: "Consultoria Digital",
    };

    const services = getServicesByCategory(categoryId);

    setTimeout(() => {
      addBotMessage(
        `Excelente escolha! 🚀\n\n**${
          categoryNames[categoryId] || "Nossos serviços"
        }** é uma das nossas especialidades.\n\nVeja as opções disponíveis:`,
        undefined,
        services
      );
      setCurrentStep("show-services");
    }, 500);
  };

  const handleShowPopular = () => {
    const services = getPopularServices();
    setTimeout(() => {
      addBotMessage(
        "🔥 Esses são os serviços mais procurados!\n\nTodos com resultados comprovados:",
        undefined,
        services
      );
      setCurrentStep("show-services");
    }, 500);
  };

  const handleContactHuman = () => {
    setTimeout(() => {
      addBotMessage(
        "Perfeito! 🤝\n\nVou te conectar com um dos nossos especialistas. Ele vai analisar seu caso e te ajudar a encontrar a melhor solução.\n\nClique no botão abaixo:",
        [
          { id: "ver-servicos", label: "Ver serviços", icon: "📦" },
          { id: "fazer-orcamento", label: "Fazer orçamento", icon: "💰" },
        ],
        undefined,
        true,
        `Olá! Vim pelo site da ${COMPANY_NAME} e gostaria de falar com um especialista.`
      );
      setCurrentStep("contact-human");
    }, 500);
  };

  const handleQuickReply = (reply: {
    id: string;
    label: string;
    icon?: string;
  }) => {
    addUserMessage(reply.label);

    if (reply.id === "atendente") {
      handleContactHuman();
      return;
    }

    if (reply.id === "ver-servicos" || reply.id === "ver-populares") {
      handleShowPopular();
      return;
    }

    if (reply.id === "fazer-orcamento" || reply.id === "novo-orcamento") {
      setLeadData({});
      startQuoteFlow();
      return;
    }

    // Handle category selections
    const categoryIds = [
      "automacoes",
      "sites",
      "chatbots",
      "landing-pages",
      "consultoria",
    ];
    if (categoryIds.includes(reply.id)) {
      handleCategorySelection(reply.id);
      return;
    }
  };

  const handleMenuSelect = (item: { id: string; label: string }) => {
    addUserMessage(item.label);

    if (item.id === "atendente") {
      handleContactHuman();
      return;
    }

    if (item.id === "ajuda") {
      handleNotUnderstood();
      return;
    }

    if (item.id === "fazer-orcamento") {
      setLeadData({});
      startQuoteFlow();
      return;
    }

    // Handle category selections
    const categoryIds = [
      "automacoes",
      "sites",
      "chatbots",
      "landing-pages",
      "consultoria",
    ];
    if (categoryIds.includes(item.id)) {
      handleCategorySelection(item.id);
      return;
    }
  };

  const handleServiceSelect = (service: Service) => {
    addUserMessage(`Quero orçamento: ${service.name}`);
    startQuoteFlow(service);
  };

  const handleRestart = () => {
    setMessages([]);
    setLeadData({});
    setCurrentStep("welcome");

    setTimeout(() => {
      addBotMessage(
        `👋 Olá! Seja bem-vindo(a) à ${COMPANY_NAME}!\n\nSomos especialistas em soluções digitais que transformam negócios.\n\nComo posso te ajudar hoje?`,
        [
          { id: "automacoes", label: "Automações", icon: "⚡" },
          { id: "sites", label: "Sites", icon: "🌐" },
          { id: "chatbots", label: "Chatbots", icon: "🤖" },
          { id: "landing-pages", label: "Landing Pages", icon: "📄" },
          { id: "consultoria", label: "Consultoria", icon: "💡" },
          { id: "atendente", label: "Falar com especialista", icon: "👨‍💻" },
        ]
      );
      setCurrentStep("category");
    }, 500);
  };

  return (
    <div className="flex flex-col h-full glass-strong rounded-2xl md:rounded-3xl overflow-hidden shadow-card relative">
      {/* Glow effects */}
      <div className="glow-orb w-40 h-40 bg-primary -top-20 -left-20 animate-pulse-glow" />
      <div
        className="glow-orb w-32 h-32 bg-accent -bottom-16 -right-16 animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Chat Header */}
      <div className="relative z-10 glass-dark px-4 md:px-6 py-4 border-b border-border/30 flex items-center gap-3">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-glow">
          <Bot className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex-1">
          <h2 className="font-display font-semibold text-foreground text-base md:text-lg">
            {COMPANY_NAME}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Online agora
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-primary font-medium">Bot Ativo</span>
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-secondary/50"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden md:inline">Recomeçar</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin relative z-10">
        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            <ChatBubble message={message.text} isBot={message.isBot} />

            {message.services && message.services.length > 0 && (
              <div className="pl-13 md:pl-14">
                <ServiceCarousel
                  services={message.services}
                  onSelectService={handleServiceSelect}
                />
              </div>
            )}

            {message.quickReplies && message.quickReplies.length > 0 && (
              <div className="pl-13 md:pl-14">
                <QuickReplies
                  replies={message.quickReplies}
                  onSelect={handleQuickReply}
                />
              </div>
            )}

            {message.showWhatsApp && message.whatsAppMessage && (
              <div className="pl-13 md:pl-14">
                <WhatsAppButton
                  message={message.whatsAppMessage}
                  phoneNumber={WHATSAPP_NUMBER}
                />
              </div>
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area with Persistent Menu */}
      <div className="relative z-10">
        <ChatInput
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          menuSlot={<PersistentMenu onSelect={handleMenuSelect} />}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
