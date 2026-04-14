import HomeServicesSubmenu from "@/components/home/HomeServicesSubmenu";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col overflow-x-hidden bg-white font-sans">
      <HomeServicesSubmenu />

      <main className="mx-auto w-full max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h1 className="mb-3 text-3xl font-bold text-black sm:mb-4 sm:text-4xl">
          Bem-vindo à TechMotors
        </h1>
        <p className="text-base text-gray-600 sm:text-lg">
          Sua oficina especializada em manutenção e reparo de veículos
        </p>
      </main>

      <Image
        src="/assets/hero-real.png"
        alt="Imagem da oficina no hero"
        width={1200}
        height={700}
        className="relative left-1/2 block h-55 w-screen -translate-x-1/2 border-y border-gray-200 object-cover sm:h-75 md:h-105"
        priority
      />

      <section id="troca-de-oleo" className="scroll-mt-44 md:scroll-mt-36 w-full pt-10 sm:pt-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl">Troca de Óleo</h2>
          <p className="max-w-3xl text-gray-700">
            E o servico de retirar o oleo antigo do motor e colocar oleo novo, no tipo certo para o seu
            veiculo. Isso ajuda a evitar desgaste prematuro e melhora o funcionamento do motor.
          </p>
          <ul className="mt-3 space-y-1 text-gray-700">
            <li>Troca do oleo do motor</li>
            <li>Substituicao do filtro de oleo</li>
            <li>Checagem rapida de vazamentos</li>
          </ul>
        </div>
        <Image
          src="/assets/troca-oleo-real.png"
          alt="Imagem de troca de oleo"
          width={1200}
          height={700}
            className="relative left-1/2 mt-6 block h-55 w-screen -translate-x-1/2 border-y border-gray-200 object-cover sm:mt-8 sm:h-75 md:h-105"
          priority
        />
      </section>

      <section
        id="manutencao-especializada"
        className="scroll-mt-44 md:scroll-mt-36 w-full border-t border-gray-200 pt-10 sm:pt-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl">Manutenção de Veículos Especializada</h2>
          <p className="max-w-3xl text-gray-700">
            Atendimento técnico completo para diagnóstico avançado, revisão preventiva e correção de
            falhas mecânicas e eletrônicas com foco em desempenho e segurança.
          </p>
        </div>
        <Image
          src="/assets/manutencao-real.png"
          alt="Imagem de manutencao especializada"
          width={1200}
          height={700}
          className="relative left-1/2 mt-6 block h-55 w-screen -translate-x-1/2 border-y border-gray-200 object-cover sm:mt-8 sm:h-75 md:h-105"
        />
      </section>

      <section
        id="alinhamento-balanceamento"
        className="scroll-mt-44 md:scroll-mt-36 w-full border-t border-gray-200 pt-10 sm:pt-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl">Alinhamento e Balanceamento</h2>
          <p className="max-w-3xl text-gray-700">
            Ajuste preciso da geometria e balanceamento das rodas para aumentar a estabilidade do
            veículo, reduzir desgaste irregular dos pneus e melhorar o conforto na condução.
          </p>
        </div>
        <Image
          src="/assets/alinhamento-real.png"
          alt="Imagem de alinhamento e balanceamento"
          width={1200}
          height={700}
          className="relative left-1/2 mt-6 block h-55 w-screen -translate-x-1/2 border-y border-gray-200 object-cover sm:mt-8 sm:h-75 md:h-105"
        />
      </section>
    </div>
  );
}
