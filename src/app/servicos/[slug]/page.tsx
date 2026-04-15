import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicoBySlug, getServicos } from "@/utils/actions/get-servicos";

type ServicoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getPublicSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) {
    return undefined;
  }

  const normalized = value.endsWith("/") ? value.slice(0, -1) : value;

  try {
    return new URL(normalized).toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export async function generateStaticParams() {
  const servicos = await getServicos();
  return servicos.map((servico) => ({ slug: servico.slug }));
}

export async function generateMetadata({ params }: ServicoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const servico = await getServicoBySlug(slug);
  const siteUrl = getPublicSiteUrl();

  if (!servico) {
    return {
      title: "Serviço não encontrado",
    };
  }

  const canonicalUrl = siteUrl ? `${siteUrl}/servicos/${servico.slug}` : undefined;
  const serviceDescription = servico.descricaoLonga ?? servico.descricao;
  const imageUrl = servico.imagemUrl;

  return {
    title: servico.titulo,
    description: serviceDescription,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: servico.titulo,
      description: serviceDescription,
      url: canonicalUrl,
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: `Imagem do serviço ${servico.titulo}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: servico.titulo,
      description: serviceDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ServicoDetalhesPage({ params }: ServicoPageProps) {
  const { slug } = await params;
  const servico = await getServicoBySlug(slug);

  if (!servico) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/servicos" className="text-sm font-medium text-gray-600 hover:text-black">
          ← Voltar para serviços
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">{servico.titulo}</h1>
          <p className="mt-4 text-lg text-gray-700">{servico.descricao}</p>
          {servico.descricaoLonga ? (
            <p className="mt-4 text-base leading-7 text-gray-700">{servico.descricaoLonga}</p>
          ) : null}
        </div>

        {servico.imagemUrl ? (
          <Image
            src={servico.imagemUrl}
            alt={`Imagem do serviço ${servico.titulo}`}
            width={1200}
            height={700}
            className="mt-8 h-72 w-full border border-gray-200 object-cover sm:h-96"
            priority
          />
        ) : null}

        {servico.itens && servico.itens.length > 0 ? (
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-black">O que inclui</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
              {servico.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-black">Precisa desse serviço?</h2>
          <p className="mt-2 text-gray-700">
            Fale com nossa equipe para tirar dúvidas e agendar atendimento.
          </p>
          {servico.ctaTitulo && servico.ctaUrl ? (
            <Link
              href={servico.ctaUrl}
              target={isExternalUrl(servico.ctaUrl) ? "_blank" : undefined}
              rel={isExternalUrl(servico.ctaUrl) ? "noopener noreferrer" : undefined}
              className="mt-5 inline-flex bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              {servico.ctaTitulo}
            </Link>
          ) : (
            <Link
              href="/contato"
              className="mt-5 inline-flex bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              Fale Conosco
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
