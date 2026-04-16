export default function NotFound() {
  return (
    <main className="flex-1 bg-white min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Página não encontrada</h1>
      <p className="text-lg text-gray-700 mb-6">O serviço solicitado não foi encontrado ou não existe.</p>
      <a href="/servicos" className="text-black font-semibold underline">Voltar para serviços</a>
    </main>
  );
}