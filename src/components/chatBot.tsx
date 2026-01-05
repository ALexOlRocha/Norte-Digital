import { useState, useRef, useEffect, useCallback } from "react";
import { RiSendPlaneFill, RiWhatsappFill, RiRefreshLine } from "react-icons/ri";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type BudgetData = {
  name: string;
  projectName: string;
  painPoint: string;
};

const quickReplies = [
  "👋 Sobre a Norte Digital",
  "🌐 Landing Pages",
  "🚀 Sites Institucionais",
  "🤖 Automações",
  "💬 PageBot (Chatbot)",
  "💰 Valores e orçamentos",
  "📞 Falar com especialista",
  "⏱️ Tempo de entrega",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 **Olá! Seja bem-vindo(a) à Norte Digital!**\n\nSomos especialistas em soluções digitais que transformam negócios.\n\n**Como posso te ajudar hoje?**",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [budgetFlow, setBudgetFlow] = useState(false);
  const [budgetData, setBudgetData] = useState<BudgetData>({
    name: "",
    projectName: "",
    painPoint: "",
  });
  const [budgetStep, setBudgetStep] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll fixo - sem animação
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    // Scroll quando mensagens mudam
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Prevenir recarregamento da página
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const getCustomResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Saudação
    if (
      /^(olá|ola|oi|bom\s*dia|boa\s*tarde|boa\s*noite|hello|hey)/i.test(
        lowerMessage
      )
    ) {
      return `👋 **Seja muito bem-vindo(a)!**\n\nNa **Norte Digital**, criamos soluções digitais que trabalham 24h para transformar visitantes em clientes.\n\n**Automatize. Escale. Venda mais.**\n\nNo que posso ajudar você hoje?`;
    }

    // Sobre a empresa
    if (/(sobre|quem\s*são|norte\s*digital|empresa)/i.test(lowerMessage)) {
      return `🏢 **SOBRE A NORTE DIGITAL**\n\nSomos especialistas em **soluções digitais completas** para negócios que querem crescer rápido.\n\n🔹 **Automações inteligentes**\n🔹 **Sites que convertem**\n🔹 **Chatbots 24/7**\n🔹 **Landing pages otimizadas**\n\n🚀 *Transformamos visitantes em clientes, todos os dias.*`;
    }

    // Orçamento
    if (/(orçamento|valor|preço|proposta|custo|quanto)/i.test(lowerMessage)) {
      startBudgetFlow();
      return "💰 **VAMOS CRIAR SEU ORÇAMENTO PERSONALIZADO!**\n\nPara começarmos, me diga seu nome 😊";
    }

    // Landing Pages
    if (/(landing\s*page|landingpage|lp)/i.test(lowerMessage)) {
      return `🌐 **LANDING PAGES QUE CONVERTEM**\n\nCriamos páginas de alta conversão para:\n• Capturar leads\n• Vender produtos\n• Promover lançamentos\n• Gerar agendamentos\n\n💰 **Investimento:** A partir de R$ 1.500\n⏱️ **Prazo:** 5-7 dias úteis\n\n✨ *Cada pixel pensado para converter!*`;
    }

    // Sites Institucionais
    if (/(site|sites|institucional|empresa|presença)/i.test(lowerMessage)) {
      return `🚀 **SITES INSTITUCIONAIS PROFISSIONAIS**\n\nSites completos que apresentam sua empresa com credibilidade:\n• Até 10 páginas\n• Sistema administrativo\n• Design responsivo\n• SEO otimizado\n\n💰 **Investimento:** A partir de R$ 3.000\n⏱️ **Prazo:** 10-15 dias úteis\n\n💼 *Sua presença digital de alta qualidade!*`;
    }

    // Automações
    if (/(automaç[aã]o|automatizar|bot|robô|automa)/i.test(lowerMessage)) {
      return `🤖 **AUTOMAÇÕES INTELIGENTES**\n\nAutomatize processos e ganhe tempo:\n• Chatbots personalizados\n• Fluxos de e-mail\n• Processos internos\n• Integrações API\n\n💰 **Investimento:** Sob consulta\n⏱️ **Prazo:** 7-14 dias úteis\n\n⚡ *Faça mais em menos tempo!*`;
    }

    // Chatbots
    if (/(pagebot|chatbot|whatsapp\s*bot|atendimento)/i.test(lowerMessage)) {
      return `💬 **CHATBOTS 24/7 - PAGEGOT**\n\nAtenda clientes automaticamente:\n• WhatsApp Business\n• Site e redes sociais\n• Qualificação de leads\n• Agendamentos automáticos\n\n💰 **Investimento:** A partir de R$ 300/mês\n⏱️ **Prazo:** 3-7 dias úteis\n\n🤖 *Atendimento humano quando você não pode!*`;
    }

    // Tempo de entrega
    if (/(tempo|prazo|entrega|quando|quanto\s*tempo)/i.test(lowerMessage)) {
      return `⏱️ **PRAZOS DE ENTREGA**\n\n🌐 **Landing Pages:** 5-7 dias úteis\n🚀 **Sites Institucionais:** 10-15 dias úteis\n🤖 **Automações:** 7-14 dias úteis\n💬 **Chatbots:** 3-7 dias úteis\n\n⚡ *Metodologia ágil para entregas rápidas!*`;
    }

    // Falar com especialista
    if (
      /(falar|especialista|humano|consultor|whatsapp|contato)/i.test(
        lowerMessage
      )
    ) {
      contactWhatsApp();
      return `📞 **FALE COM NOSSO ESPECIALISTA**\n\n💬 **WhatsApp:** (11) 99982-5835\n\n🕒 **Horário:**\nSeg-Sex: 8h às 18h\nSáb: 9h às 12h\n\n✨ *Vamos encontrar a solução perfeita para você!*`;
    }

    // Agradecimento
    if (/(obrigad[ao]|valeu|grato|agradeço)/i.test(lowerMessage)) {
      return "🤝 **Obrigado pelo contato!**\n\nFico feliz em ajudar!\n\nQualquer dúvida, estou aqui! 🚀";
    }

    // Fallback
    const fallbackResponses = [
      "🤔 **Pergunta interessante!**\n\nPosso te ajudar com:\n• Informações sobre serviços\n• Orçamentos personalizados\n• Prazos de entrega\n• Falar com especialista",
      "💡 **Vamos focar no que importa!**\n\nConte-me sobre seu projeto ou dúvida específica.",
      "🚀 **Pronto para transformar seu negócio?**\n\nMe pergunte sobre landing pages, sites, automações ou chatbots!",
    ];

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

  const startBudgetFlow = () => {
    setBudgetFlow(true);
    setBudgetStep(1);
  };

  const handleBudgetStep = () => {
    if (budgetStep === 1 && budgetData.name) {
      setBudgetStep(2);
      addBotMessage(
        `**Perfeito, ${budgetData.name}!**\n\nAgora me diga o nome do seu projeto ou empresa 😊`
      );
    } else if (budgetStep === 2 && budgetData.projectName) {
      setBudgetStep(3);
      addBotMessage(
        `**Excelente!**\n\nAgora descreva rapidamente o que você precisa 📝`
      );
    } else if (budgetStep === 3 && budgetData.painPoint) {
      setBudgetStep(4);
      addBotMessage(
        `🎉 **TUDO PRONTO!**\n\nVou te conectar com nosso especialista para um orçamento personalizado!`
      );
      setTimeout(() => {
        contactWhatsAppWithBudget();
      }, 1000);
    }
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: Date.now() + Math.random(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now() + Math.random(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (budgetFlow) {
      switch (budgetStep) {
        case 1:
          setBudgetData({ ...budgetData, name: inputValue });
          break;
        case 2:
          setBudgetData({ ...budgetData, projectName: inputValue });
          break;
        case 3:
          setBudgetData({ ...budgetData, painPoint: inputValue });
          break;
      }
      setInputValue("");
      setTimeout(() => handleBudgetStep(), 300);
      return;
    }

    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getCustomResponse(inputValue);

      const botMessage: Message = {
        id: Date.now() + Math.random(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const contactWhatsApp = () => {
    const message =
      "Olá! Gostaria de saber mais sobre os serviços da Norte Digital.";
    window.open(
      `https://wa.me/5511999825835?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const contactWhatsAppWithBudget = () => {
    const message = `Olá! Vim pelo site da Norte Digital.

Nome: ${budgetData.name}
Projeto/Empresa: ${budgetData.projectName}
Necessidade: ${budgetData.painPoint}

Gostaria de receber um orçamento.`;

    window.open(
      `https://wa.me/5511999825835?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // Reset
    setBudgetFlow(false);
    setBudgetStep(0);
    setBudgetData({ name: "", projectName: "", painPoint: "" });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 **Olá! Seja bem-vindo(a) à Norte Digital!**\n\nSomos especialistas em soluções digitais que transformam negócios.\n\n**Como posso te ajudar hoje?**",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setBudgetFlow(false);
    setBudgetStep(0);
    setBudgetData({ name: "", projectName: "", painPoint: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-4">
      {/* Header Minimalista */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Automatize.
            </span>
            <span className="text-white"> </span>
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Escale.
            </span>
            <span className="text-white"> </span>
            <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              Venda mais.
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Soluções digitais que trabalham 24h para transformar visitantes em
            clientes
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Chat Container */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-white to-white rounded-full flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="NorteDigital Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">Norte Digital</h3>
                  <p className="text-green-400 text-xs flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </p>
                </div>
              </div>

              <button
                onClick={handleClearChat}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer p-2"
                title="Limpar conversa"
              >
                <RiRefreshLine className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Replies Bar */}
          <div className="bg-gray-800 border-b border-gray-700 p-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container - FIXED HEIGHT */}
          <div
            ref={chatContainerRef}
            className="h-[55vh] overflow-y-auto bg-gray-950"
            style={{ scrollBehavior: "auto" }}
          >
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-br-none"
                        : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm md:text-base">
                      {message.text.split("**").map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="text-white">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === "user"
                          ? "text-green-200"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-200 p-4 rounded-2xl rounded-bl-none border border-gray-700">
                    <div className="flex space-x-1.5 items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 bg-gray-900 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  budgetFlow
                    ? budgetStep === 1
                      ? "Digite seu nome..."
                      : budgetStep === 2
                      ? "Nome do projeto ou empresa..."
                      : budgetStep === 3
                      ? "Descreva sua necessidade..."
                      : "Digite sua mensagem..."
                    : "Digite sua mensagem..."
                }
                className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-3 rounded-xl hover:from-green-700 hover:to-emerald-800 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <RiSendPlaneFill className="w-5 h-5" />
              </button>
            </form>

            {/* Bottom Text */}
            <div className="flex items-center justify-center mt-4 pt-3 border-t border-gray-800">
              <button
                onClick={contactWhatsApp}
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <RiWhatsappFill className="w-4 h-4 mr-2 text-green-500" />
                Falar com especialista no WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Footer Minimalista */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Norte Digital • (11) 99982-5835
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Soluções digitais para crescimento exponencial
          </p>
        </div>
      </div>
    </div>
  );
}
