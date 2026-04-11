'use client';

import Link from "next/link";
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <main className="flex-1 bg-white flex items-center justify-center">
      <div className="max-w-md w-full text-center px-4">
        <div className="text-6xl font-bold text-black mb-4">500</div>
        <h1 className="text-3xl font-bold text-black mb-2">Oops! Algo deu errado</h1>
        <p className="text-gray-600 mb-6">
          Desculpe, encontramos um erro inesperado ao processar sua requisição. Nossa equipe foi notificada e está trabalhando para resolve-lo.
        </p>
        
        {error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Detalhes do erro:</span> {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="border border-black text-black px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Voltar ao Início
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Código de erro: {error.digest}
        </p>
      </div>
    </main>
  );
}
