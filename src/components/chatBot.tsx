import { useState, useRef, useEffect, useCallback } from "react";
import {
  RiChatDeleteFill,
  RiVolumeUpFill,
  RiVolumeMuteFill,
  RiMicFill,
  RiMicOffFill,
} from "react-icons/ri";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  image?: string;
};

type Conversation = {
  userQuery: string;
  botResponse: string;
  timestamp: Date;
  wasHelpful?: boolean;
};

type LearningData = {
  conversations: Conversation[];
};

type Service = {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: string;
  category: string;
  deliveryTime: string;
};

const services: Service[] = [
  {
    id: 1,
    name: "🌐 Landing Pages",
    description: "Páginas de conversão otimizadas para capturar leads e vendas",
    features: [
      "Design responsivo e moderno",
      "Otimização para SEO",
      "Integração com formulários",
      "Análise de métricas (Google Analytics)",
      "Carregamento rápido",
      "Mobile-first",
    ],
    price: "A partir de R$ 1.500",
    category: "desenvolvimento",
    deliveryTime: "5-7 dias úteis",
  },
  {
    id: 2,
    name: "🚀 Sites Institucionais",
    description: "Presença digital completa para sua empresa",
    features: [
      "Até 10 páginas",
      "Sistema administrativo",
      "Galeria de imagens",
      "Blog integrado",
      "Formulário de contato",
      "Google Maps",
    ],
    price: "A partir de R$ 3.000",
    category: "desenvolvimento",
    deliveryTime: "10-15 dias úteis",
  },
  {
    id: 3,
    name: "🤖 Automações",
    description: "Automatize processos e aumente sua produtividade",
    features: [
      "Chatbots personalizados",
      "Automação de e-mails",
      "Integração com APIs",
      "Workflows customizados",
      "Relatórios automáticos",
      "Notificações inteligentes",
    ],
    price: "Sob consulta",
    category: "automação",
    deliveryTime: "7-14 dias úteis",
  },
  {
    id: 4,
    name: "📱 Cardápios Digitais",
    description: "Cardápios interativos para restaurantes e bares",
    features: [
      "QR Code personalizado",
      "Atualização em tempo real",
      "Fotos em alta qualidade",
      "Categorias organizadas",
      "Modo offline",
      "Integração com WhatsApp",
    ],
    price: "A partir de R$ 800/mês",
    category: "soluções-digitais",
    deliveryTime: "3-5 dias úteis",
  },
  {
    id: 5,
    name: "⚡ MVPs (Produto Mínimo Viável)",
    description: "Valide sua ideia rapidamente no mercado",
    features: [
      "Desenvolvimento ágil",
      "Funcionalidades essenciais",
      "Testes com usuários reais",
      "Feedback estruturado",
      "Escalabilidade planejada",
      "Documentação técnica",
    ],
    price: "Sob consulta",
    category: "desenvolvimento",
    deliveryTime: "15-30 dias úteis",
  },
  {
    id: 6,
    name: "🔧 Microserviços",
    description: "Soluções específicas para necessidades pontuais",
    features: [
      "APIs customizadas",
      "Integrações específicas",
      "Sistemas modulares",
      "Alta disponibilidade",
      "Documentação completa",
      "Suporte técnico",
    ],
    price: "Sob consulta",
    category: "desenvolvimento",
    deliveryTime: "Varia conforme complexidade",
  },
  {
    id: 7,
    name: "💬 PageBot",
    description: "Chatbots inteligentes para seu site ou WhatsApp",
    features: [
      "Respostas automáticas 24/7",
      "Integração com WhatsApp Business",
      "Qualificação de leads",
      "Agendamento automático",
      "Suporte multilíngue",
      "Análise de conversas",
    ],
    price: "A partir de R$ 300/mês",
    category: "automação",
    deliveryTime: "3-7 dias úteis",
  },
  {
    id: 8,
    name: "🎨 Sites Personalizados",
    description: "Soluções únicas sob medida para seu negócio",
    features: [
      "Design exclusivo",
      "Funcionalidades customizadas",
      "Otimização avançada",
      "Treinamento da equipe",
      "Manutenção mensal",
      "Hospedagem incluída",
    ],
    price: "Sob consulta",
    category: "desenvolvimento",
    deliveryTime: "20-40 dias úteis",
  },
];

const quickReplies = [
  "👋 Sobre a Norte Digital",
  "🌐 Serviços de desenvolvimento",
  "🤖 Automações disponíveis",
  "📱 Cardápios digitais",
  "⚡ MVP - Como funciona?",
  "💬 PageBot (Chatbot)",
  "💰 Valores e orçamentos",
  "📞 Falar com especialista",
  "⏱️ Tempo de entrega",
  "🛠️ Microserviços",
];

const useLearningData = () => {
  const [learningData, setLearningData] = useState<LearningData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("nortedigital-chatbot-learning");
      return savedData
        ? JSON.parse(savedData)
        : {
            conversations: [],
          };
    }
    return {
      conversations: [],
    };
  });

  const saveConversation = useCallback(
    (userQuery: string, botResponse: string) => {
      const newConversation: Conversation = {
        userQuery,
        botResponse,
        timestamp: new Date(),
      };

      setLearningData((prev) => {
        const updated = {
          ...prev,
          conversations: [...prev.conversations, newConversation].slice(-100),
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "nortedigital-chatbot-learning",
            JSON.stringify(updated)
          );
        }

        return updated;
      });
    },
    []
  );

  const updateConversationFeedback = useCallback(
    (index: number, wasHelpful: boolean) => {
      setLearningData((prev) => {
        const updatedConversations = [...prev.conversations];
        if (updatedConversations[index]) {
          updatedConversations[index].wasHelpful = wasHelpful;
        }

        const updated = {
          ...prev,
          conversations: updatedConversations,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "nortedigital-chatbot-learning",
            JSON.stringify(updated)
          );
        }

        return updated;
      });
    },
    []
  );

  return {
    learningData,
    saveConversation,
    updateConversationFeedback,
  };
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Olá! Seja bem-vindo(a) à **Norte Digital** – Sua parceira em soluções digitais! 🚀\n\nOferecemos serviços completos de desenvolvimento web, automações e muito mais para alavancar seu negócio!\n\nComo posso te ajudar hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioCache = useRef<Map<string, SpeechSynthesisUtterance>>(new Map());

  const { learningData, saveConversation, updateConversationFeedback } =
    useLearningData();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (!isAudioEnabled || !window.speechSynthesis) return;

      const cleanText = text.replace(/\*/g, "").replace(/\n/g, ". ");

      if (audioCache.current.has(cleanText)) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(audioCache.current.get(cleanText)!);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "pt-BR";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        speechSynthesisRef.current = null;
      };

      audioCache.current.set(cleanText, utterance);
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [isAudioEnabled]
  );

  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Erro no reconhecimento de voz:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const getCustomResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Saudação inicial e sobre a empresa
    if (
      /^(olá|ola|oi|bom\s*dia|boa\s*tarde|boa\s*noite|hello|hey|oi\s*tudo\s*bem|sobre\s*a\s*empresa|quem\s*são|norte\s*digital)/i.test(
        lowerMessage
      )
    ) {
      return `🏢 **SOBRE A NORTE DIGITAL**\n\nSomos uma empresa especializada em soluções digitais completas para negócios de todos os tamanhos.\n\n🔹 **Missão:** Transformar ideias em realidade digital\n🔹 **Visão:** Ser referência em inovação tecnológica no Norte do país\n🔹 **Valores:** Qualidade, agilidade, transparência e parceria\n\nCom expertise em desenvolvimento web, automações e estratégias digitais, ajudamos empresas a crescerem no mundo digital! 🚀`;
    }

    // Todos os serviços
    if (
      /(serviços|o\s*que\s*fazem|o\s*que\s*faz|o\s*que\s*vendem|portfolio|catálogo)/i.test(
        lowerMessage
      )
    ) {
      let response = "🚀 **NOSSOS SERVIÇOS**\n\n";

      services.forEach((service) => {
        response += `${service.name}\n`;
        response += `📝 ${service.description}\n`;
        response += `💰 ${service.price}\n`;
        response += `⏱️ Entrega: ${service.deliveryTime}\n\n`;
      });

      response += "💬 *Gostaria de saber mais sobre algum serviço específico?*";
      return response;
    }

    // Serviços específicos
    if (/(landing\s*page|landingpage|lp)/i.test(lowerMessage)) {
      const service = services[0];
      return `🌐 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n📞 *Quer desenvolver uma landing page? Fale com nosso especialista!*`;
    }

    if (
      /(site\s*institucional|site\s*empresa|site\s*completo)/i.test(
        lowerMessage
      )
    ) {
      const service = services[1];
      return `🏢 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n💡 *Ideal para empresas que querem uma presença digital profissional!*`;
    }

    if (/(automaç[aã]o|automatizar|bot|robô)/i.test(lowerMessage)) {
      const service = services[2];
      return `🤖 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n⚡ *Automatize processos e ganhe tempo para focar no que realmente importa!*`;
    }

    if (
      /(card[aá]pio\s*digital|cardapio|restaurante|bar)/i.test(lowerMessage)
    ) {
      const service = services[3];
      return `📱 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n🍽️ *Perfeito para restaurantes, bares, lanchonetes e food trucks!*`;
    }

    if (
      /(mvp|produto\s*m[ií]nimo|validaç[aã]o|testar\s*ideia)/i.test(
        lowerMessage
      )
    ) {
      const service = services[4];
      return `⚡ **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n💡 *Não gaste tempo e dinheiro desenvolvendo algo que os clientes não querem!*`;
    }

    if (
      /(microserviço|api|integraç[aã]o|sistema\s*espec[ií]fico)/i.test(
        lowerMessage
      )
    ) {
      const service = services[5];
      return `🔧 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n🎯 *Solução perfeita para necessidades específicas sem desenvolver sistemas complexos!*`;
    }

    if (
      /(pagebot|chatbot|whatsapp\s*bot|atendimento\s*autom[aá]tico)/i.test(
        lowerMessage
      )
    ) {
      const service = services[6];
      return `💬 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n🤖 *Atenda seus clientes 24/7 sem aumentar sua equipe!*`;
    }

    if (
      /(site\s*personalizado|sob\s*medida|exclusivo|customizado)/i.test(
        lowerMessage
      )
    ) {
      const service = services[7];
      return `🎨 **${service.name.toUpperCase()}**\n\n${
        service.description
      }\n\n✨ **PRINCIPAIS FUNCIONALIDADES:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\n💰 **INVESTIMENTO:** ${service.price}\n⏱️ **PRAZO:** ${
        service.deliveryTime
      }\n\n🌟 *Tenha um site único que realmente representa sua marca!*`;
    }

    // Preços e orçamentos
    if (
      /(quanto\s*custa|preço|preco|valor|orçamento|orçamento|quanto\s*é|custo)/i.test(
        lowerMessage
      )
    ) {
      return `💰 **VALORES E ORÇAMENTOS**\n\nOs valores variam conforme o serviço e complexidade do projeto:\n\n🌐 **Landing Pages:** A partir de R$ 1.500\n🏢 **Sites Institucionais:** A partir de R$ 3.000\n🤖 **Automações:** Sob consulta\n📱 **Cardápios Digitais:** A partir de R$ 800/mês\n⚡ **MVPs:** Sob consulta\n🔧 **Microserviços:** Sob consulta\n💬 **PageBot:** A partir de R$ 300/mês\n🎨 **Sites Personalizados:** Sob consulta\n\n📞 *Para um orçamento preciso, entre em contato com nossa equipe!*`;
    }

    // Tempo de entrega
    if (
      /(tempo\s*de\s*entrega|prazo|quando\s*fica\s*pronto|quanto\s*tempo)/i.test(
        lowerMessage
      )
    ) {
      return `⏱️ **PRAZOS DE ENTREGA**\n\nOs prazos variam conforme o serviço:\n\n🌐 **Landing Pages:** 5-7 dias úteis\n🏢 **Sites Institucionais:** 10-15 dias úteis\n🤖 **Automações:** 7-14 dias úteis\n📱 **Cardápios Digitais:** 3-5 dias úteis\n⚡ **MVPs:** 15-30 dias úteis\n🔧 **Microserviços:** Varia conforme complexidade\n💬 **PageBot:** 3-7 dias úteis\n🎨 **Sites Personalizados:** 20-40 dias úteis\n\n🚀 *Trabalhamos com metodologia ágil para entregar mais rápido!*`;
    }

    // Falar com especialista
    if (
      /(falar\s*com\s*especialista|atendente|humano|consultor|vendedor|contato|whatsapp|telefone)/i.test(
        lowerMessage
      )
    ) {
      return `📞 **FALE COM NOSSA EQUIPE**\n\n💬 **WhatsApp:** (99) 99999-9999\n📧 **E-mail:** contato@nortedigital.com\n🌐 **Site:** www.nortedigital.com\n\n🕒 **Horário de atendimento:**\nSegunda a Sexta: 8h às 18h\nSábado: 9h às 12h\n\n✨ *Nossos especialistas estão prontos para entender sua necessidade e propor a melhor solução!*`;
    }

    // Processo de trabalho
    if (
      /(como\s*trabalham|processo|metodologia|etapas|passo\s*a\s*passo)/i.test(
        lowerMessage
      )
    ) {
      return `🔄 **NOSSO PROCESSO DE TRABALHO**\n\n1️⃣ **Briefing:** Entendemos sua necessidade\n2️⃣ **Proposta:** Apresentamos a solução ideal\n3️⃣ **Contrato:** Formalizamos nossa parceria\n4️⃣ **Desenvolvimento:** Criamos sua solução\n5️⃣ **Revisões:** Ajustamos conforme seu feedback\n6️⃣ **Entrega:** Lançamos seu projeto\n7️⃣ **Suporte:** Acompanhamos pós-entrega\n\n🔧 *Trabalhamos com metodologia ágil e transparência total!*`;
    }

    // Manutenção e suporte
    if (
      /(manutenç[aã]o|suporte|atualizaç[aã]o|garantia|pós\s*venda)/i.test(
        lowerMessage
      )
    ) {
      return `🔧 **SUPORTE E MANUTENÇÃO**\n\nOferecemos diferentes planos de suporte:\n\n✅ **Suporte Básico:** Correções de emergência\n✅ **Suporte Intermediário:** Atualizações mensais\n✅ **Suporte Completo:** Manutenção preventiva + evolutiva\n\n📞 *Todos nossos projetos incluem garantia de 30 dias e suporte inicial!*`;
    }

    // Agradecimento
    if (/(obrigad[ao]|valeu|grato|agradeço|obrigado)/i.test(lowerMessage)) {
      return "🤝 Por nada! Fico feliz em ajudar!\n\nQualquer dúvida sobre nossos serviços, estou à disposição!\n\n✨ *A Norte Digital está pronta para transformar sua ideia em realidade!* 🚀";
    }

    // Fallback
    const fallbackResponses = [
      "🤔 Desculpe, não entendi completamente. Você pode perguntar sobre nossos serviços, valores ou processos de trabalho!",
      "💡 Posso te ajudar com informações sobre:\n• Nossos serviços de desenvolvimento\n• Automações e chatbots\n• Valores e prazos\n• Como trabalhamos",
      "🚀 Sou especializado em explicar os serviços da Norte Digital! Que tal perguntar sobre:\n- Landing Pages\n- Sites Institucionais\n- Cardápios Digitais\n- PageBot (nosso chatbot)\n- Ou outros serviços?",
    ];

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getCustomResponse(inputValue);

      const botMessage: Message = {
        id: Date.now(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      saveConversation(inputValue, botMessage.text);
      setIsTyping(false);

      speakText(botMessage.text);
    }, 800 + Math.random() * 500);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleFeedback = (messageId: number, isHelpful: boolean) => {
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex !== -1) {
      updateConversationFeedback(messageIndex, isHelpful);

      const feedbackMessage: Message = {
        id: Date.now(),
        text: isHelpful
          ? "Obrigado pelo feedback! Vou usar isso para melhorar nas respostas."
          : "Lamento não ter ajudado. Vou melhorar para a próxima!",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, feedbackMessage]);
      speakText(feedbackMessage.text);
    }
  };

  const contactWhatsApp = () => {
    const message =
      "Olá! Gostaria de saber mais sobre os serviços da Norte Digital.";
    window.open(
      `https://wa.me/559999999999?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[95vw] max-w-md h-[80vh] bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-2 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1.5 rounded-full">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">ND</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Norte Digital</h3>
                <p className="text-xs text-green-300">● Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="text-white hover:text-blue-200 transition-colors cursor-pointer"
                aria-label={isAudioEnabled ? "Desativar áudio" : "Ativar áudio"}
              >
                {isAudioEnabled ? (
                  <RiVolumeUpFill className="w-5 h-5" />
                ) : (
                  <RiVolumeMuteFill className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={toggleVoiceInput}
                className={`text-white hover:text-blue-200 transition-colors cursor-pointer ${
                  isListening ? "animate-pulse" : ""
                }`}
                aria-label={isListening ? "Parar gravação" : "Iniciar gravação"}
              >
                {isListening ? (
                  <RiMicFill className="w-5 h-5 text-red-300" />
                ) : (
                  <RiMicOffFill className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 transition-colors cursor-pointer"
                aria-label="Fechar chat"
              >
                <RiChatDeleteFill className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-2 overflow-y-auto bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 rounded-3xl py-4 ${
                    message.sender === "user"
                      ? "bg-blue-100 text-gray-800 rounded-br-none border border-blue-200"
                      : "bg-gradient-to-r from-blue-50 to-white text-gray-800 rounded-bl-none border border-blue-100 shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>

                  {message.image && (
                    <div className="relative w-82 max-md:w-70 h-48 mt-2">
                      <img
                        src={message.image}
                        alt="Imagem enviada pelo bot"
                        sizes="(max-width: 768px) 100vw, 250px"
                        className="object-contain rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-1">
                    <p
                      className={`text-xs ${
                        message.sender === "user"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>

                    {message.sender === "bot" && (
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className="text-xs text-green-500 hover:text-green-600 cursor-pointer"
                          title="Resposta útil"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className="text-xs text-red-500 hover:text-red-600 cursor-pointer"
                          title="Resposta não útil"
                        >
                          👎
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="bg-gradient-to-r from-blue-50 to-white text-gray-800 p-6 rounded-lg rounded-bl-none shadow-sm border border-blue-100">
                  <div className="flex space-x-1 items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
              <h4 className="font-semibold text-blue-800 mb-2">
                📱 Fale Conosco
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Quer um orçamento personalizado ou tem dúvidas específicas?
              </p>
              <button
                onClick={contactWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors flex items-center justify-center"
              >
                <span className="mr-2">💬</span> Conversar no WhatsApp
              </button>
            </div>

            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-blue-100 bg-white">
            <div className="flex flex-wrap gap-1.5 mb-2 overflow-x-auto pb-1">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-gradient-to-r from-green-500 to-green-600 cursor-pointer hover:from-green-600 hover:to-green-700 text-white px-2 py-1 rounded-full whitespace-nowrap transition-all duration-200 shadow-sm"
                >
                  {reply}
                </button>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Digite sua dúvida sobre nossos serviços..."
                className="flex-1 border border-blue-200 rounded-l-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 rounded-r-md hover:from-blue-600 hover:to-blue-700 focus:outline-none disabled:opacity-50 transition-all duration-200 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-black to-green-700 text-white cursor-pointer rounded-full p-3 shadow-lg hover:from-black hover:to-green-800 focus:outline-none transition-all duration-200"
          aria-label="Abrir chat da Norte Digital"
        >
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="font-bold text-lg">N</span>
            </div>
            <div className="absolute -top-4 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </button>
      )}
    </div>
  );
}
