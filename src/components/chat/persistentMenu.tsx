import { useState } from "react";
import {
  Menu,
  X,
  Zap,
  Globe,
  Bot,
  FileText,
  Lightbulb,
  MessageCircle,
  DollarSign,
  HelpCircle,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface PersistentMenuProps {
  onSelect: (item: MenuItem) => void;
}

const menuItems: MenuItem[] = [
  { id: "automacoes", label: "Automações", icon: <Zap className="w-4 h-4" /> },
  { id: "sites", label: "Sites", icon: <Globe className="w-4 h-4" /> },
  { id: "chatbots", label: "Chatbots", icon: <Bot className="w-4 h-4" /> },
  {
    id: "landing-pages",
    label: "Landing Pages",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "consultoria",
    label: "Consultoria",
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    id: "fazer-orcamento",
    label: "Fazer orçamento",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    id: "atendente",
    label: "Falar com especialista",
    icon: <MessageCircle className="w-4 h-4" />,
  },
  {
    id: "ajuda",
    label: "Preciso de ajuda",
    icon: <HelpCircle className="w-4 h-4" />,
  },
];

const PersistentMenu = ({ onSelect }: PersistentMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: MenuItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
          isOpen
            ? "bg-primary text-primary-foreground rotate-90"
            : "bg-secondary/80 text-foreground hover:bg-secondary"
        }`}
        aria-label="Menu de opções"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Items */}
          <div className="absolute bottom-full left-0 mb-2 z-50 w-56 glass-strong rounded-xl border border-border/30 shadow-card overflow-hidden animate-fade-in">
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-3 py-2 font-medium uppercase tracking-wider">
                Menu Rápido
              </p>
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 text-left group"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PersistentMenu;
