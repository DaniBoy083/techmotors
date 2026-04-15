import { getData } from "@/utils/actions/get-data";

type HomeServico = {
  id: number;
  titulo: string;
  descricao: string;
  imagemUrl?: string;
};

export type HomePageData = {
  hero: {
    heading: string;
    buttonTitle: string;
    buttonUrl: string;
    bannerUrl: string;
  };
  about: {
    description: string;
    bannerUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    time: string;
  };
  services: HomeServico[];
};

type CosmicHomeService = {
  title?: string;
  titulo?: string;
  description?: string;
  descricao?: string;
  image?: {
    url?: string;
    imgix_url?: string;
  };
};

type CosmicHome = {
  metadata?: {
    heading?: string;
    cta_button?: {
      title?: string;
      url?: string;
    };
    banner?: {
      url?: string;
      imgix_url?: string;
    };
    about?: {
      description?: string;
      banner?: {
        url?: string;
        imgix_url?: string;
      };
    };
    services?: CosmicHomeService[];
    contact?: {
      email?: string;
      phone?: string;
      adress?: string;
      time?: string;
    };
  };
};

type CosmicObjectsResponse<T> = {
  objects?: T[];
};

const EMPTY_HOME_DATA: HomePageData = {
  hero: {
    heading: "",
    buttonTitle: "",
    buttonUrl: "",
    bannerUrl: "",
  },
  about: {
    description: "",
    bannerUrl: "",
  },
  contact: {
    email: "",
    phone: "",
    address: "",
    time: "",
  },
  services: [],
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

export async function getHomePageData(): Promise<HomePageData> {
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

    const metadata = data.objects?.[0]?.metadata;

    if (!metadata) {
      return EMPTY_HOME_DATA;
    }

    const services = (metadata.services ?? [])
      .map((item, index) => {
        const titulo = item.title ?? item.titulo;
        const descricao = item.description ?? item.descricao;

        if (!titulo || !descricao) {
          return null;
        }

        return {
          id: index + 1,
          titulo: formatServicoTitulo(titulo),
          descricao,
          imagemUrl: item.image?.imgix_url ?? item.image?.url,
        } satisfies HomeServico;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return {
      hero: {
        heading: metadata.heading?.trim() || "",
        buttonTitle: metadata.cta_button?.title?.trim() || "",
        buttonUrl: metadata.cta_button?.url?.trim() || "",
        bannerUrl: metadata.banner?.imgix_url ?? metadata.banner?.url ?? "",
      },
      about: {
        description: metadata.about?.description?.trim() || "",
        bannerUrl: metadata.about?.banner?.imgix_url ?? metadata.about?.banner?.url ?? "",
      },
      contact: {
        email: metadata.contact?.email?.trim() || "",
        phone: metadata.contact?.phone?.trim() || "",
        address: metadata.contact?.adress?.trim() || "",
        time: metadata.contact?.time?.trim() || "",
      },
      services,
    };
  } catch {
    return EMPTY_HOME_DATA;
  }
}
