import { MessageCircle, ArrowRight } from "lucide-react";

interface WhatsAppButtonProps {
  message: string;
  phoneNumber?: string;
}

const WhatsAppButton = ({
  message,
  phoneNumber = "5511999999999",
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-button animate-fade-in w-full md:w-auto group"
    >
      <MessageCircle className="w-5 h-5" />
      Finalizar no WhatsApp
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

export default WhatsAppButton;
