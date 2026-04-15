import { getData } from "@/utils/actions/get-data";

export type ContatoInfo = {
  telefone: string;
  telefoneDisplay: string;
  horarioTelefone: string;
  email: string;
  prazoResposta: string;
  enderecoLinha1: string;
  enderecoLinha2: string;
  enderecoCep: string;
  observacaoEndereco: string;
  horariosAtendimento: string[];
};

type CosmicContato = {
  metadata?: {
    contact?: {
      phone?: string;
      email?: string;
      adress?: string;
      time?: string;
    };
  };
};

type CosmicObjectsResponse<T> = {
  objects?: T[];
};

const EMPTY_CONTATO: ContatoInfo = {
  telefone: "",
  telefoneDisplay: "",
  horarioTelefone: "",
  email: "",
  prazoResposta: "",
  enderecoLinha1: "",
  enderecoLinha2: "",
  enderecoCep: "",
  observacaoEndereco: "",
  horariosAtendimento: [],
};

export async function getContatoInfo(): Promise<ContatoInfo> {
  try {
    const data = await getData<CosmicObjectsResponse<CosmicContato>>({
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
    const contact = metadata?.contact;

    if (!contact) {
      return EMPTY_CONTATO;
    }

    const phoneDigits = (contact.phone ?? "").replace(/\D/g, "");

    return {
      telefone: phoneDigits ? `+55${phoneDigits}` : "",
      telefoneDisplay: contact.phone ?? "",
      horarioTelefone: contact.time ?? "",
      email: contact.email ?? "",
      prazoResposta: "",
      enderecoLinha1: contact.adress ?? "",
      enderecoLinha2: "",
      enderecoCep: "",
      observacaoEndereco: "",
      horariosAtendimento: contact.time ? [contact.time] : [],
    };
  } catch {
    return EMPTY_CONTATO;
  }
}
