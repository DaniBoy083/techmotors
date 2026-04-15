import { getData } from "@/utils/actions/get-data";

export type Servico = {
  id: number;
  slug: string;
  titulo: string;
  descricao: string;
  icone?: string;
  imagemUrl?: string;
  descricaoLonga?: string;
  itens?: string[];
  ctaTitulo?: string;
  ctaUrl?: string;
};

type CosmicHomeService = {
  title?: string;
  titulo?: string;
  image?: {
    url?: string;
    imgix_url?: string;
  };
  description?: string;
  descricao?: string;
  long_description?: string;
  longDescription?: string;
  descricao_longa?: string;
  descricaoLonga?: string;
  details?: string;
  detalhes?: string;
  items?: string[];
  itens?: string[];
  bullet_points?: string[];
  bulletPoints?: string[];
  cta_title?: string;
  ctaTitle?: string;
  cta_url?: string;
  ctaUrl?: string;
  [key: string]: unknown;
};

type CosmicHome = {
  metadata?: {
    services?: CosmicHomeService[];
  };
};

type CosmicObjectsResponse<T> = {
  objects?: T[];
};

function formatServicoTitulo(value: string) {
  const connectorWords = new Set(["a", "as", "e", "o", "os", "da", "das", "de", "do", "dos", "em", "na", "nas", "no", "nos", "para", "por"]);

  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index > 0 && connectorWords.has(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function createServicoSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getStringField(source: CosmicHomeService, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
}

function getStringArrayField(source: CosmicHomeService, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) {
      const items = value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);

      if (items.length > 0) {
        return items;
      }
    }
  }

  return undefined;
}

export async function getServicos(): Promise<Servico[]> {
  try {
    const data = await getData<CosmicObjectsResponse<CosmicHome>>({
      endpoint: "/objects",
      params: {
        type: "home",
        depth: 1,
        props: "metadata",
      },
      init: {
        next: { revalidate: 300 },
      },
    });

    const homeObject = data.objects?.[0];
    const apiServicos = (homeObject?.metadata?.services ?? [])
      .map((item, index) => {
        const descricao = item.description ?? item.descricao;
        const titulo = item.title ?? item.titulo;

        if (!titulo || !descricao) {
          return null;
        }

        return {
          id: index + 1,
          slug: createServicoSlug(titulo),
          titulo: formatServicoTitulo(titulo),
          descricao,
          imagemUrl: item.image?.imgix_url ?? item.image?.url,
          descricaoLonga: getStringField(item, ["long_description", "longDescription", "descricao_longa", "descricaoLonga", "details", "detalhes"]),
          itens: getStringArrayField(item, ["items", "itens", "bullet_points", "bulletPoints"]),
          ctaTitulo: getStringField(item, ["cta_title", "ctaTitle"]),
          ctaUrl: getStringField(item, ["cta_url", "ctaUrl"]),
        } satisfies Servico;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return apiServicos;
  } catch {
    return [];
  }
}

export async function getServicoBySlug(slug: string): Promise<Servico | null> {
  const servicos = await getServicos();
  return servicos.find((servico) => servico.slug === slug) ?? null;
}
