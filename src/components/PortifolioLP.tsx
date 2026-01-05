// components/Portfolio.tsx (versão sem busca)
import React from "react";

interface PortfolioItem {
  id: number;
  imageUrl: string;
  title: string;
  alt?: string;
}

interface PortfolioProps {
  items?: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({
  items = defaultPortfolioItems,
}) => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-[#2a9d90] to-black flex flex-col gap-y-12 items-center justify-center py-20 overflow-hidden">
      <div className="inline-block mb-6">
        <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase border border-emerald-400/30 px-4 py-2 rounded-full">
          Portfolio
        </span>
      </div>
      {/* Título */}
      {/* Decorative Text - Escondido em mobile */}
      <p className="hidden lg:block absolute -left-24 lg:-left-64 top-1/2 -translate-y-1/2 z-0 text-[8rem] lg:text-[12rem] font-black text-white/20 rotate-90 select-none tracking-tighter whitespace-nowrap">
        ENTRE EM
      </p>
      <p className="hidden lg:block absolute -right-24 lg:-right-64 top-1/2 -translate-y-1/2 z-0 text-[6rem] lg:text-[12rem] font-black text-white/20 -rotate-90 select-none tracking-tighter whitespace-nowrap">
        CONTATO
      </p>
      <div className="text-center z-10">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
          Seu site não é um cartão de visitas.
          <span className="block text-emerald-400">
            É uma máquina de vendas.
          </span>
        </h1>
        <p className="text-zinc-300 text-xl md:text-2xl">
          Veja projetos criados para converter visitantes em clientes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 px-4 max-w-7xl mx-auto">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
      <svg
        className="absolute  bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
        />
      </svg>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

// Componente do card (mantido igual)
const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="img-port w-80 h-96 bg-cover bg-top cursor-pointer rounded-[40px] relative overflow-hidden group transition-all duration-8000 ease-in-out hover:bg-bottom border-4 border-white/20 hover:border-white/40 shadow-2xl hover:scale-105 transform ">
      <div className="w-full h-full relative">
        <img
          src={item.imageUrl}
          alt={item.alt || item.title}
          className="object-cover object-top group-hover:object-bottom transition-all duration-8000"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="overlay absolute inset-0 bg-black/2 rounded-[40px] flex items-center justify-center text-xl  text-black font-extrabold opacity-0 transition-opacity duration-500 group-hover:opacity-100 p-4 text-center ">
          <span className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
};

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    imageUrl: "/screencapture-jaguaris.png",
    title: "LP da Jaguaris",
    alt: "Landing Page da Jaguaris",
  },
  {
    id: 2,
    imageUrl: "/screencapture-e-commerce-mk.png",
    title: "E-commerce da MK Distribuidora + ChatBot",
    alt: "E-commerce MK Distribuidora",
  },
  {
    id: 3,
    imageUrl: "/screencapture-zarpfy.png",
    title: "Site + sistema de pagamento + dashboard Zarpfy",
    alt: "Sistema Zarpfy",
  },
  {
    id: 4,
    imageUrl: "/screencapture-aryehsheva.png",
    title: "LP da Aryeh Sheva",
    alt: "Landing Page Aryeh Sheva",
  },
  {
    id: 5,
    imageUrl: "/screencapture-pedronitools.png",
    title: "Site da Pedroni Tools",
    alt: "Site Pedroni Tools",
  },
  {
    id: 6,
    imageUrl: "/screencapture-mkdistribuidora.png",
    title: "Landing Page da MK Distribuidora",
    alt: "Landing Page da MK Distribuidora",
  },
];

export default Portfolio;
