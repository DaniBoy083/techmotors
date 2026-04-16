import { getData } from "@/utils/actions/get-data";

type CosmicPageObject = {
  slug?: string;
  title?: string;
  metadata?: {
    banner?: {
      url?: string;
      imgix_url?: string;
    };
    image?: {
      url?: string;
      imgix_url?: string;
    };
    descricao?: string;
    description?: string | { title?: string; text?: string };
    [key: string]: unknown;
  };
};

type CosmicPagesResponse = {
  objects?: CosmicPageObject[];
  object?: CosmicPageObject & {
    metadata?: CosmicPageObject["metadata"] & {
      paginas?: CosmicPageObject[];
    };
  };
};

export type CosmicPage = {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
};

function normalizeTitle(value: string) {
  const title = value.trim();

  if (!title) {
    return "";
  }

  // Preserve API-provided casing when the title already has mixed case (e.g. "Dev Motors").
  if (title !== title.toLowerCase()) {
    return title;
  }

  const connectorWords = new Set([
    "a",
    "as",
    "e",
    "o",
    "os",
    "da",
    "das",
    "de",
    "do",
    "dos",
    "em",
    "na",
    "nas",
    "no",
    "nos",
    "para",
    "por",
  ]);

  return title
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

function getDescription(metadata: CosmicPageObject["metadata"]) {
  if (!metadata) {
    return "";
  }

  if (typeof (metadata as Record<string, unknown>).subtitle === "string") {
    const subtitle = ((metadata as Record<string, unknown>).subtitle as string).trim();
    if (subtitle) {
      return subtitle;
    }
  }

  if (typeof metadata.descricao === "string") {
    return metadata.descricao.trim();
  }

  if (typeof metadata.description === "string") {
    return metadata.description.trim();
  }

  if (
    metadata.description &&
    typeof metadata.description === "object" &&
    "text" in metadata.description
  ) {
    const text = metadata.description.text;
    if (typeof text === "string" && text.trim()) {
      return text.trim();
    }
  }

  if (
    metadata.description &&
    typeof metadata.description === "object" &&
    "title" in metadata.description
  ) {
    const title = metadata.description.title;
    if (typeof title === "string" && title.trim()) {
      return title.trim();
    }
  }

  if (typeof (metadata as Record<string, unknown>).excerpt === "string") {
    const excerpt = ((metadata as Record<string, unknown>).excerpt as string).trim();
    if (excerpt) {
      return excerpt;
    }
  }

  return "";
}

function getImageUrl(metadata: CosmicPageObject["metadata"]) {
  if (!metadata) {
    return undefined;
  }

  return metadata.banner?.imgix_url ?? metadata.banner?.url ?? metadata.image?.imgix_url ?? metadata.image?.url;
}

function toCosmicPage(item: CosmicPageObject): CosmicPage | null {
  const slug = item.slug?.trim();
  const title = item.title?.trim();

  if (!slug || !title) {
    return null;
  }

  return {
    slug,
    title: normalizeTitle(title),
    description: getDescription(item.metadata),
    imageUrl: getImageUrl(item.metadata),
  };
}

function normalizePageObjects(data: CosmicPagesResponse) {
  if (Array.isArray(data.objects) && data.objects.length > 0) {
    return data.objects;
  }

  if (Array.isArray(data.object?.metadata?.paginas) && data.object.metadata.paginas.length > 0) {
    return data.object.metadata.paginas;
  }

  if (data.object) {
    return [data.object];
  }

  return [];
}

export async function getCosmicPages(): Promise<CosmicPage[]> {
  try {
    const data = await getData<CosmicPagesResponse>({
      endpoint: "/objects",
      params: {
        type: "pages",
        depth: 1,
        props: "slug,title,metadata,type",
      },
      init: {
        next: { revalidate: 320 },
      },
    });

    return normalizePageObjects(data)
      .map((item) => toCosmicPage(item))
      .filter((item): item is CosmicPage => item !== null);
  } catch {
    return [];
  }
}

export async function getCosmicPageBySlug(slug: string): Promise<CosmicPage | null> {
  const pages = await getCosmicPages();
  return pages.find((page) => page.slug === slug) ?? null;
}