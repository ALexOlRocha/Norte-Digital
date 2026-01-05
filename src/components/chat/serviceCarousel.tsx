import { Service } from "@/data/services";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ServiceCard from "./serviceCard";

interface ServiceCarouselProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

const ServiceCarousel = ({
  services,
  onSelectService,
}: ServiceCarouselProps) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={onSelectService}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-2" />
    </ScrollArea>
  );
};

export default ServiceCarousel;
