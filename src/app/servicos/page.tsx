
import type { Metadata } from "next";
import { getCosmicPages } from "@/utils/actions/get-cosmic-pages";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Conheça todos os serviços oferecidos pela TechMotors - manutenção, reparos e diagnóstico automotivo.",
};

export default async function Servicos() {
  const paginas = await getCosmicPages();

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
          {paginas.map((pagina) => (
            <div
              key={pagina.slug}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition border border-gray-200"
            >
              {pagina.imageUrl ? (
                <Image
                  src={pagina.imageUrl}
                  alt={`Imagem do serviço ${pagina.title}`}
                  width={640}
                  height={360}
                  className="mb-4 h-44 w-full rounded-md object-cover"
                />
              ) : null}
              <h3 className="text-xl font-bold text-black mb-2">{pagina.title}</h3>
              <p className="text-gray-600 mb-4">{pagina.description || "Saiba mais sobre este serviço."}</p>
              <Link href={`/servicos/${pagina.slug}`} className="text-black font-medium hover:underline">
                Saiba Mais →
              </Link>
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
