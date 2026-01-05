import { Sparkles } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground flex-shrink-0 shadow-glow">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="chat-bubble chat-bubble-bot">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
