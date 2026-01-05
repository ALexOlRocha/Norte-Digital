import { useState, FormEvent, KeyboardEvent, ReactNode } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  menuSlot?: ReactNode;
}

const ChatInput = ({ onSendMessage, isTyping, menuSlot }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="glass-dark border-t border-border/30 px-4 md:px-6 py-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Persistent Menu */}
        {menuSlot}

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            rows={1}
            className="input-field resize-none min-h-[48px] max-h-[120px] pr-4"
            disabled={isTyping}
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim() || isTyping}
          className="send-button flex-shrink-0"
        >
          <Send className="w-5 h-5 text-primary-foreground" />
        </button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-3">
        ☰ Menu rápido • Digite ou escolha uma opção
      </p>
    </div>
  );
};

export default ChatInput;
