import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a TechMotors por telefone, email ou visite nossa oficina em João Pessoa, PB.",
};

export default function Contato() {
  return (
    <main className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Entre em Contato</h1>
          <p className="text-lg text-gray-600">
            Estamos aqui para ajudar! Fale conosco através dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Telefone</h3>
              <p className="text-gray-600 text-lg">
                <a href="tel:+5583987654321" className="hover:text-black transition">
                  (83) 98765-4321
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-1">Seg - Sex: 8h às 18h</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Email</h3>
              <p className="text-gray-600 text-lg">
                <a href="mailto:contato@techmotors.com" className="hover:text-black transition">
                  contato@techmotors.com
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-1">Responderemos em até 24 horas</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Localização</h3>
              <p className="text-gray-600">
                Av. Epitácio Pessoa, 1234<br />
                Tambauzinho, João Pessoa - PB<br />
                CEP: 58039-000
              </p>
              <p className="text-gray-500 text-sm mt-1">Estacionamento disponível</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Horários</h3>
              <p className="text-gray-600">
                Segunda a Sexta: 8h - 18h<br />
                Sábado: 8h - 14h<br />
                Domingo: Fechado
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6">Envie uma Mensagem</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                  placeholder="(83) 98765-4321"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="assunto"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition resize-none"
                  placeholder="Sua mensagem aqui..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black mb-6">Nos Visite</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-600">Mapa será integrado futuramente</p>
          </div>
        </div>
      </section>
    </main>
  );
}
