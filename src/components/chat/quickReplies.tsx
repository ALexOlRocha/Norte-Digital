interface QuickReply {
  id: string;
  label: string;
  icon?: string;
}

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

const QuickReplies = ({ replies, onSelect }: QuickRepliesProps) => {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      {replies.map((reply, index) => (
        <button
          key={reply.id}
          onClick={() => onSelect(reply)}
          className="quick-reply text-sm"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {reply.icon && <span className="mr-1.5">{reply.icon}</span>}
          {reply.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
