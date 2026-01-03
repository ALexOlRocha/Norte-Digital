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

type ProductCategory = {
  id: number;
  name: string;
  items: Product[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  isAvailable: boolean;
};

const cardapio: ProductCategory[] = [
  {
    id: 1,
    name: "🍗 Salgados Tradicionais",
    items: [
      {
        id: 101,
        name: "Coxinha",
        description: "Recheio de frango desfiado temperado",
        price: "R$ 6,50",
        category: "salgados",
        isAvailable: true,
      },
      {
        id: 102,
        name: "Quibe",
        description: "Carne moída com trigo e hortelã",
        price: "R$ 6,50",
        category: "salgados",
        isAvailable: true,
      },
      {
        id: 103,
        name: "Empada",
        description: "Frango ou palmito (consultar)",
        price: "R$ 6,00",
        category: "salgados",
        isAvailable: true,
      },
      {
        id: 104,
        name: "Risole",
        description: "Carne ou frango (consultar)",
        price: "R$ 6,00",
        category: "salgados",
        isAvailable: true,
      },
    ],
  },
  {
    id: 2,
    name: "🥐 Especiais da Casa",
    items: [
      {
        id: 201,
        name: "Enroladinho de Salsicha",
        description: "Massa crocante com salsicha premium",
        price: "R$ 7,00",
        category: "especiais",
        isAvailable: true,
      },
      {
        id: 202,
        name: "Bolinha de Queijo",
        description: "Queijo muçarela derretido",
        price: "R$ 6,50",
        category: "especiais",
        isAvailable: true,
      },
      {
        id: 203,
        name: "Pastel de Forno",
        description: "Carne, queijo ou pizza (consultar)",
        price: "R$ 7,50",
        category: "especiais",
        isAvailable: true,
      },
    ],
  },
  {
    id: 3,
    name: "🍩 Doces & Sobremesas",
    items: [
      {
        id: 301,
        name: "Brigadeiro",
        description: "Tradicional ou gourmet",
        price: "R$ 5,50",
        category: "doces",
        isAvailable: true,
      },
      {
        id: 302,
        name: "Bolinho de Chuva",
        description: "Crocante por fora, macio por dentro",
        price: "R$ 5,00",
        category: "doces",
        isAvailable: true,
      },
      {
        id: 303,
        name: "Torta Doce",
        description: "Variedade conforme o dia",
        price: "R$ 8,00",
        category: "doces",
        isAvailable: true,
      },
    ],
  },
  {
    id: 4,
    name: "🥖 Pães & Complementos",
    items: [
      {
        id: 401,
        name: "Pão Francês",
        description: "Fresquinho, feito no dia",
        price: "R$ 1,50/un",
        category: "paes",
        isAvailable: true,
      },
      {
        id: 402,
        name: "Pão de Queijo",
        description: "Tradicional mineiro",
        price: "R$ 6,00",
        category: "paes",
        isAvailable: true,
      },
    ],
  },
];

const quickReplies = [
  "📋 Ver cardápio completo",
  "🛒 Fazer um pedido",
  "⏳ Tempo de preparo",
  "💳 Formas de pagamento",
  "📍 Localização",
  "📞 Falar com atendente",
  "🎉 Promoções do dia",
  "🥖 Tem pão francês?",
];

const useLearningData = () => {
  const [learningData, setLearningData] = useState<LearningData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("minisalgados-chatbot-learning");
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
            "minisalgados-chatbot-learning",
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
            "minisalgados-chatbot-learning",
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
      text: "👋 Olá! Seja bem-vindo(a) à Mini Salgados & Grandes Desejos ✨\n\nSalgados artesanais, quentinhos e feitos com amor 😋\n\nComo posso te ajudar hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Product[]>([]);
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

    // Saudação inicial
    if (
      /^(olá|ola|oi|bom\s*dia|boa\s*tarde|boa\s*noite|hello|hey|oi\s*tudo\s*bem)/i.test(
        lowerMessage
      )
    ) {
      return "👋 Olá! Seja bem-vindo(a) à Mini Salgados & Grandes Desejos ✨\n\nSalgados artesanais, quentinhos e feitos com amor 😋\n\nComo posso te ajudar hoje?";
    }

    // Cardápio completo
    if (
      /(cardápio|cardapio|menu|o\s*que\s*tem|produtos|ver\s*cardápio)/i.test(
        lowerMessage
      )
    ) {
      let response = "📋 **NOSSO CARDÁPIO COMPLETO** ✨\n\n";

      cardapio.forEach((category) => {
        response += `**${category.name}**\n`;
        category.items.forEach((item) => {
          const emoji = item.isAvailable ? "✅" : "⏳";
          response += `${emoji} ${item.name} - ${item.price}\n   ${item.description}\n`;
        });
        response += "\n";
      });

      response += "\n😋 *Todos feitos na hora, com ingredientes selecionados!*";
      return response;
    }

    // Valores / Preços
    if (
      /(quanto\s*custa|preço|preco|valor|quanto\s*é|quanto\s*vale)/i.test(
        lowerMessage
      )
    ) {
      return "💰 Os valores variam de acordo com o produto escolhido.\n\nVou te mostrar nosso cardápio atualizado para você conferir preços e opções disponíveis 😍";
    }

    // Combo ou unidade
    if (
      /(combo|unidade|separado|individual|como\s*funciona)/i.test(lowerMessage)
    ) {
      return "📦 Trabalhamos com unidades, porções e combos, conforme o item do cardápio.\n\nCada produto possui a descrição certinha com quantidade incluída 😊";
    }

    // Tamanho dos produtos
    if (/(tamanho|grande|mini|pequeno)/i.test(lowerMessage)) {
      return "📏 Temos opções mini e tamanho tradicional, conforme o produto.\n\nTodos os detalhes aparecem na descrição de cada item do cardápio 😉";
    }

    // Sabores disponíveis
    if (/(sabores|opções|tem\s*o\s*que|quais\s*tem)/i.test(lowerMessage)) {
      return "😋 Nossos sabores variam conforme o cardápio do dia.\n\nVou te mostrar agora as opções disponíveis para hoje 👇";
    }

    // Disponibilidade
    if (/(disponível|tem\s*hoje|o\s*que\s*tem|estoque)/i.test(lowerMessage)) {
      return "✅ Os produtos disponíveis dependem do cardápio do dia.\n\nConfira abaixo tudo o que está sendo preparado hoje, sempre fresquinho 🔥";
    }

    // Pronta entrega
    if (
      /(pronta\s*entrega|já\s*pronto|entrega\s*imediata)/i.test(lowerMessage)
    ) {
      return "❌ Não trabalhamos com pronta entrega.\n\nTodos os nossos salgados são preparados na hora do pedido, garantindo qualidade e frescor 💛";
    }

    // Tempo de preparo
    if (
      /(tempo|demora|quanto\s*tempo|preparação|rapidez)/i.test(lowerMessage)
    ) {
      return "⏳ O tempo médio de preparo é de 15 a 30 minutos,\n\npodendo variar conforme a quantidade do pedido e a demanda do momento.";
    }

    // Promoções
    if (/(promoção|promocao|oferta|desconto|especial)/i.test(lowerMessage)) {
      return "🎉 As promoções variam conforme o dia.\n\nCaso tenha alguma oferta ativa, ela aparecerá destacada no cardápio 😉";
    }

    // Pãozinho / Pão francês
    if (
      /(pãozinho|paozinho|pão\s*francês|pao\s*frances|pão\s*diário)/i.test(
        lowerMessage
      )
    ) {
      return "🥖 Sim! Temos pão francês fresquinho, preparado no dia, disponível no cardápio 😍";
    }

    // Formas de pagamento
    if (
      /(pagamento|cartão|cartao|pix|dinheiro|débito|crédito|maquininha)/i.test(
        lowerMessage
      )
    ) {
      return "💳 **FORMAS DE PAGAMENTO**\n\n• Pix\n• Dinheiro\n• Débito e crédito por aproximação\n\n⚠️ O pagamento é feito diretamente pelo aplicativo no celular.\nNão utilizamos maquininha física.";
    }

    // Localização
    if (
      /(localização|onde\s*fica|endereço|entrega|delivery)/i.test(lowerMessage)
    ) {
      return "📍 **NOSSA LOCALIZAÇÃO**\n\nEstamos localizados no coração da cidade!\n\n*Delivery disponível para região central.*\n\nPara saber o endereço exato e valor do delivery, entre em contato pelo WhatsApp: (99) 99999-9999";
    }

    // Falar com atendente
    if (
      /(atendente|humano|pessoa|telefone|whatsapp|contato)/i.test(lowerMessage)
    ) {
      return "📞 **FALE DIRETAMENTE CONOSCO**\n\nWhatsApp: (99) 99999-9999\n\nHorário de atendimento:\nSegunda a Sábado: 8h às 20h\nDomingo: 9h às 18h\n\nEstamos aqui para te atender! ✨";
    }

    // Fazer pedido / Finalização
    if (
      /(fazer\s*pedido|quero\s*pedir|encomendar|finalizar)/i.test(
        lowerMessage
      ) ||
      lowerMessage.includes("pedido")
    ) {
      if (currentOrder.length === 0) {
        return "🛒 Para fazer um pedido, primeiro escolha os itens do cardápio!\n\nDiga-me o que você gostaria ou peça para ver o cardápio completo 😊";
      } else {
        const orderSummary = currentOrder
          .map((item) => `• ${item.name} - ${item.price}`)
          .join("\n");
        const total = currentOrder
          .reduce((sum, item) => {
            const price = parseFloat(
              item.price.replace("R$ ", "").replace(",", ".")
            );
            return sum + price;
          }, 0)
          .toFixed(2)
          .replace(".", ",");

        return `🛒 **RESUMO DO SEU PEDIDO** ✨\n\n${orderSummary}\n\n💰 **Total: R$ ${total}**\n\n📲 **Clique no botão abaixo para enviar tudo direto no nosso WhatsApp e confirmar seu pedido!**\n\nOu continue adicionando mais itens 😋`;
      }
    }

    // Adicionar item ao pedido
    const foundProduct = cardapio
      .flatMap((cat) => cat.items)
      .find(
        (item) =>
          lowerMessage.includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(lowerMessage)
      );

    if (foundProduct) {
      setCurrentOrder((prev) => [...prev, foundProduct]);
      return `✅ **${foundProduct.name}** adicionado ao seu pedido!\n\n${foundProduct.description}\nPreço: ${foundProduct.price}\n\nDeseja adicionar mais alguma coisa? 😊`;
    }

    // Agradecimento
    if (/(obrigad[ao]|valeu|grato|agradeço|obrigado)/i.test(lowerMessage)) {
      return "🫡 Por nada! É um prazer te atender!\n\nQualquer dúvida, estou à disposição. Bom apetite! 😋✨";
    }

    // Fallback
    const fallbackResponses = [
      "😊 Desculpe, não entendi completamente. Poderia reformular sua pergunta?",
      "🤔 Hmm, não tenho certeza sobre isso. Gostaria de ver nosso cardápio ou saber sobre formas de pagamento?",
      "😅 Ainda estou aprendendo! Você pode perguntar sobre nosso cardápio, fazer um pedido ou formas de pagamento.",
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

  const sendToWhatsApp = () => {
    if (currentOrder.length === 0) return;

    const orderSummary = currentOrder
      .map((item) => `${item.name} - ${item.price}`)
      .join("%0A");
    const total = currentOrder
      .reduce((sum, item) => {
        const price = parseFloat(
          item.price.replace("R$ ", "").replace(",", ".")
        );
        return sum + price;
      }, 0)
      .toFixed(2);

    const message = `Olá! Gostaria de fazer um pedido:%0A%0A${orderSummary}%0A%0ATotal: R$ ${total}%0A%0AEnviado via PageBot Mini Salgados`;

    window.open(`https://wa.me/559999999999?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[95vw] max-w-md h-[80vh] bg-[#F5F1EA] rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] text-white px-3 py-2 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white/85 p-1.5 rounded-full">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-[#2C2C2C] font-bold text-xs">MS</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  Mini Salgados & Grandes Desejos
                </h3>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="text-white hover:text-gray-300 transition-colors cursor-pointer"
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
                className={`text-white hover:text-gray-300 transition-colors cursor-pointer ${
                  isListening ? "animate-pulse" : ""
                }`}
                aria-label={isListening ? "Parar gravação" : "Iniciar gravação"}
              >
                {isListening ? (
                  <RiMicFill className="w-5 h-5 text-red-400" />
                ) : (
                  <RiMicOffFill className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                aria-label="Fechar chat"
              >
                <RiChatDeleteFill className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-2 overflow-y-auto bg-[#F9F7F3]">
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
                      ? "bg-white text-gray-800 rounded-br-none border border-gray-200"
                      : "bg-[#2C2C2C] text-white rounded-bl-none"
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
                          ? "text-gray-500"
                          : "text-gray-300"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>

                    {message.sender === "bot" && (
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className="text-xs text-green-300 hover:text-green-100 cursor-pointer"
                          title="Resposta útil"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className="text-xs text-red-300 hover:text-red-100 cursor-pointer"
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
                <div className="bg-[#2C2C2C] text-white p-6 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex space-x-1 items-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {currentOrder.length > 0 && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">🛒 Seu Pedido</h4>
                  <button
                    onClick={() => setCurrentOrder([])}
                    className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Limpar
                  </button>
                </div>
                {currentOrder.map((item, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">
                    • {item.name} - {item.price}
                  </div>
                ))}
                <button
                  onClick={sendToWhatsApp}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                >
                  📲 Enviar pedido no WhatsApp
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-200 bg-white">
            <div className="flex flex-wrap gap-1.5 mb-2 overflow-x-auto pb-1">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-[#2C2C2C] cursor-pointer hover:bg-gray-800 text-white px-2 py-1 rounded-full whitespace-nowrap transition-colors"
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
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2C2C2C]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-[#2C2C2C] text-white px-3 rounded-r-md hover:bg-gray-800 focus:outline-none disabled:opacity-50 transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#2C2C2C] text-white cursor-pointer rounded-full p-3 shadow-lg hover:bg-gray-800 focus:outline-none transition-colors"
          aria-label="Abrir chat"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:h-8 max-md:w-8 w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}
    </div>
  );
}
