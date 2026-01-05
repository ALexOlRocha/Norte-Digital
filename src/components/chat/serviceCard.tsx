import { Service } from "@/data/services";
import { Clock, Star, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
  const categoryIcons: Record<string, string> = {
    automacoes: "⚡",
    sites: "🌐",
    chatbots: "🤖",
    "landing-pages": "📄",
    consultoria: "💡",
  };

  return (
    <div className="service-card w-[280px] flex-shrink-0 group">
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Category icon */}
        <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center text-xl border border-border/30">
          {categoryIcons[service.category] || "📦"}
        </div>

        {service.isPopular && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-display font-semibold text-foreground text-base leading-tight line-clamp-2">
          {service.name}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {service.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {service.features.slice(0, 2).map((feature, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-secondary/60 text-secondary-foreground px-2 py-0.5 rounded-full border border-border/30"
            >
              {feature}
            </span>
          ))}
          {service.features.length > 2 && (
            <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full border border-primary/30">
              +{service.features.length - 2}
            </span>
          )}
        </div>

        {/* Price and delivery */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <p className="font-display font-bold text-primary text-sm">
            {service.price}
          </p>
          {service.deliveryTime && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {service.deliveryTime}
            </span>
          )}
        </div>

        <button
          onClick={() => onSelect(service)}
          className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow active:scale-95 group/btn"
        >
          Fazer orçamento
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
