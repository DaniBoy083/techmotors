import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCosmicPageBySlug, getCosmicPages } from "@/utils/actions/get-cosmic-pages";

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

export async function generateStaticParams() {
  const pages = await getCosmicPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ServicoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCosmicPageBySlug(slug);
  const siteUrl = getPublicSiteUrl();

  if (!page) {
    return {
      title: "Serviço não encontrado | TechMotors",
      description: "A página de serviço solicitada não foi encontrada.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = siteUrl ? `${siteUrl}/servicos/${page.slug}` : undefined;

  return {
    title: `${page.title} | Serviços | TechMotors`,
    description: page.description || `Confira detalhes sobre ${page.title} na TechMotors.`,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: `${page.title} | Serviços | TechMotors`,
      description: page.description || `Confira detalhes sobre ${page.title} na TechMotors.`,
      url: canonicalUrl,
      type: "article",
      images: page.imageUrl
        ? [
            {
              url: page.imageUrl,
              alt: `Imagem do serviço ${page.title}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: page.imageUrl ? "summary_large_image" : "summary",
      title: `${page.title} | Serviços | TechMotors`,
      description: page.description || `Confira detalhes sobre ${page.title} na TechMotors.`,
      images: page.imageUrl ? [page.imageUrl] : undefined,
    },
  };
}

export default async function ServicoDetalhesPage({ params }: ServicoPageProps) {
  const { slug } = await params;
  const page = await getCosmicPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/servicos" className="text-sm font-medium text-gray-600 hover:text-black">
          ← Voltar para serviços
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">{page.title}</h1>
          <p className="mt-4 text-lg text-gray-700">
            {page.description || "Conteúdo em atualização. Entre em contato para mais detalhes."}
          </p>
        </div>

        {page.imageUrl ? (
          <Image
            src={page.imageUrl}
            alt={`Imagem do serviço ${page.title}`}
            width={1200}
            height={700}
            className="mt-8 h-72 w-full border border-gray-200 object-cover sm:h-96"
            priority
          />
        ) : null}
      </section>
    </main>
  );
}