import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Conheça todos os serviços oferecidos pela TechMotors - manutenção, reparos e diagnóstico automotivo.",
};

export default function Servicos() {
  const servicos = [
    {
      id: 1,
      titulo: "Manutenção Preventiva",
      descricao: "Mantenha seu veículo sempre em perfeito estado com nossa manutenção preventiva especializada.",
      icone: "🔧",
    },
    {
      id: 2,
      titulo: "Diagnóstico Automotivo",
      descricao: "Diagnóstico completo com equipamento de alta tecnologia para identificar qualquer problema.",
      icone: "🖥️",
    },
    {
      id: 3,
      titulo: "Reparo de Motor",
      descricao: "Reparos especializados em motores de todas as marcas com garantia de qualidade.",
      icone: "⚙️",
    },
    {
      id: 4,
      titulo: "Serviço de Freios",
      descricao: "Inspeção, manutenção e reparo completo do sistema de freios do seu veículo.",
      icone: "🛑",
    },
    {
      id: 5,
      titulo: "Suspensão e Alinhamento",
      descricao: "Alinhamento de rodas e reparo de suspensão para melhor dirigibilidade e conforto.",
      icone: "🚙",
    },
    {
      id: 6,
      titulo: "Ar Condicionado",
      descricao: "Recarga, limpeza e reparos no sistema de ar condicionado do seu veículo.",
      icone: "❄️",
    },
  ];

  return (
    <main className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Nossos Serviços</h1>
          <p className="text-lg text-gray-600">
            Oferecemos uma ampla gama de serviços automotivos para manter seu veículo em perfeito estado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico) => (
            <div
              key={servico.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition border border-gray-200"
            >
              <div className="text-5xl mb-4">{servico.icone}</div>
              <h3 className="text-xl font-bold text-black mb-2">{servico.titulo}</h3>
              <p className="text-gray-600 mb-4">{servico.descricao}</p>
              <button className="text-black font-medium hover:underline">
                Saiba Mais →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de nossos serviços?</h2>
          <p className="text-gray-300 mb-6">
            Entre em contato conosco para agendar uma consulta ou esclarecer dúvidas.
          </p>
          <a
            href="/contato"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Fale Conosco
          </a>
        </div>
      </section>
    </main>
  );
}
