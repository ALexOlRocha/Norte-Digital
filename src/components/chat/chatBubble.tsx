import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  children?: React.ReactNode;
}

const ChatBubble = ({ message, isBot, children }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-fade-in",
        !isBot && "flex-row-reverse"
      )}
    >
      {isBot ? (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0 shadow-glow">
          <Bot className="w-5 h-5" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
          <User className="w-5 h-5" />
        </div>
      )}
      <div className="flex flex-col gap-3 max-w-[85%]">
        <div
          className={cn(
            "chat-bubble",
            isBot ? "chat-bubble-bot" : "chat-bubble-user"
          )}
        >
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ChatBubble;
