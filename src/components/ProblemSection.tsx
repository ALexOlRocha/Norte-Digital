import { AlertCircle, MessageSquareWarning, Clock, Target } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 relative bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header - Mais Conversacional */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-100 mb-6">
              <Target className="w-4 h-4 text-red-500" />
              <span className="text-red-600 text-sm font-medium">
                Identifique o Real Problema
              </span>
            </div>

            <h2 className="text-4xl text-black md:text-5xl font-light mb-6 leading-tight">
              Você está cansado de ver isso acontecer no seu negócio?
            </h2>

            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 text-lg mb-8">
                Esses não são "problemas normais" do empreendedorismo. São
                sinais de que seu funil de vendas está vazando.
              </p>
            </div>
          </div>

          {/* Problems Grid - Visual mais Clean */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Tráfego que não vira caixa
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Seu site recebe visitas, mas parece uma loja vazia. As pessoas
                entram, olham e vão embora sem deixar nada além de estatísticas.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm text-red-600 font-medium">
                  💡 Resultado atual:
                </div>
                <div className="text-gray-700 font-medium mt-1">
                  Visitas ≠ Vendas
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageSquareWarning className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                WhatsApp lotado de "só perguntar"
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Suas conversas são um rodízio de dúvidas que nunca terminam em
                compra. Você vira atendente em vez de vendedor.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm text-orange-600 font-medium">
                  ⏰ Custo escondido:
                </div>
                <div className="text-gray-700 font-medium mt-1">
                  Tempo gasto ≠ Lucro gerado
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Robô humano de atendimento
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Você repete as mesmas respostas todos os dias. Seu potencial
                fica limitado às horas do seu dia.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-sm text-blue-600 font-medium">
                  🔄 Ciclo vicioso:
                </div>
                <div className="text-gray-700 font-medium mt-1">
                  Mais trabalho ≠ Mais crescimento
                </div>
              </div>
            </div>
          </div>

          {/* Main Message - Mais Impactante */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/5 to-blue-500/5 rounded-3xl blur-xl"></div>

            <div className="relative p-10 md:p-14 rounded-3xl bg-white border-2 border-gray-100 shadow-xl">
              <div className="text-center">
                <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 mb-10">
                  <span className="text-gray-700 font-semibold">
                    🚨 A verdade que ninguém te conta:
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-light mb-8 leading-snug text-gray-900">
                  Ter presença online{" "}
                  <span className="font-semibold text-red-600">não é</span> ter
                  um sistema de vendas
                </h3>

                <div className="max-w-3xl mx-auto mb-12">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-2xl">❌</span>
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 font-medium">
                          O erro mais comum?
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          Culpar o preço quando o problema é o processo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-gray-900">
                      Baixar preços é um remédio temporário
                    </span>{" "}
                    para uma doença crônica.
                  </p>

                  <div className="p-6 bg-gradient-to-r from-red-50/50 to-transparent border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-gray-700 text-base">
                      <span className="font-medium">O problema real?</span> Seus
                      leads não são qualificados, seu processo não converte e
                      cada venda depende 100% do seu esforço manual.
                    </p>
                  </div>

                  <p className="text-gray-600 text-base pt-4 border-t border-gray-100">
                    A solução não está em trabalhar mais, mas em vender de forma
                    mais inteligente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Indicator */}
          <div className="mt-20 flex flex-col items-center">
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">
              Pronto para resolver isso de verdade?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
