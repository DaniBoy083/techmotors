import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página Não Encontrada",
  description: "A página que você procura não existe.",
};

export default function NotFound() {
  return (
    <main className="flex-1 bg-white flex items-center justify-center">
      <div className="max-w-md w-full text-center px-4">
        <div className="text-6xl font-bold text-black mb-4">404</div>
        <h1 className="text-3xl font-bold text-black mb-2">Página Não Encontrada</h1>
        <p className="text-gray-600 mb-6">
          Desculpe, a página que você está procurando não existe ou foi removida. Verifique a URL e tente novamente.
        </p>

        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <a
            href="/"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Voltar ao Início
          </a>
          <a
            href="/servicos"
            className="border border-black text-black px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Ver Serviços
          </a>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Precisa de ajuda?</p>
          <a
            href="/contato"
            className="text-black font-medium hover:underline"
          >
            Entre em contato conosco →
          </a>
        </div>
      </div>
    </main>
  );
}
