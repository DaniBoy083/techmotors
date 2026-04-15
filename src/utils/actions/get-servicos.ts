import { getData } from "@/utils/actions/get-data";

export type Servico = {
  id: number;
  titulo: string;
  descricao: string;
  icone?: string;
  imagemUrl?: string;
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
          titulo: formatServicoTitulo(titulo),
          descricao,
          imagemUrl: item.image?.imgix_url ?? item.image?.url,
        } satisfies Servico;
      })
      .filter((item): item is Servico => item !== null);

    return apiServicos;
  } catch {
    return [];
  }
}
