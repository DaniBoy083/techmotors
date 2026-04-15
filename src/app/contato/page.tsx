import type { Metadata } from "next";
import { getContatoInfo } from "@/utils/actions/get-contato-info";
import ContactForm from "@/components/contato/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a TechMotors por telefone, email ou visite nossa oficina em João Pessoa, PB.",
};

export default async function Contato() {
  const contato = await getContatoInfo();

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
                <a href={`tel:${contato.telefone}`} className="hover:text-black transition">
                  {contato.telefoneDisplay}
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-1">{contato.horarioTelefone}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Email</h3>
              <p className="text-gray-600 text-lg">
                <a href={`mailto:${contato.email}`} className="hover:text-black transition">
                  {contato.email}
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-1">{contato.prazoResposta}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Localização</h3>
              <p className="text-gray-600">
                {contato.enderecoLinha1}
                <br />
                {contato.enderecoLinha2}
                <br />
                {contato.enderecoCep}
              </p>
              <p className="text-gray-500 text-sm mt-1">{contato.observacaoEndereco}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Horários</h3>
              <p className="text-gray-600">
                {contato.horariosAtendimento.map((horario) => (
                  <span key={horario}>
                    {horario}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6">Envie uma Mensagem</h3>
            <ContactForm />
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
