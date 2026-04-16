import HomeHero from "@/components/home/HomeHero";
import HomeServicesSubmenu from "@/components/home/HomeServicesSubmenu";
import { getCosmicPages } from "@/utils/actions/get-cosmic-pages";
import { getHomePageData } from "@/utils/actions/get-home-page-data";
import Image from "next/image";

export default async function Home() {
  const homeData = await getHomePageData();
  const pages = await getCosmicPages();

  return (
    <div className="flex min-h-full flex-1 flex-col overflow-x-hidden bg-white font-sans">
      <HomeServicesSubmenu pages={pages} />

      {homeData.hero.heading && homeData.hero.bannerUrl ? (
        <HomeHero
          heading={homeData.hero.heading}
          buttonTitle={homeData.hero.buttonTitle}
          buttonUrl={homeData.hero.buttonUrl}
          bannerUrl={homeData.hero.bannerUrl}
        />
      ) : null}

      {homeData.about.description && homeData.about.bannerUrl ? (
        <section id="sobre" className="w-full border-t border-gray-200 pt-10 sm:pt-16">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:grid-cols-2 sm:gap-8 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center">
              <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl">Sobre a TechMotors</h2>
              <p className="text-gray-700">{homeData.about.description}</p>
            </div>
            <div>
              <Image
                src={homeData.about.bannerUrl}
                alt="Imagem da seção sobre"
                width={900}
                height={600}
                className="h-56 w-full border border-gray-200 object-cover sm:h-64 md:h-72 lg:h-80"
              />
            </div>
          </div>
        </section>
      ) : null}

      {pages.length > 0 ? (
        <section className="w-full border-t border-gray-200 py-10 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-black sm:text-3xl">Serviços em destaque</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <a
                  key={page.slug}
                  href={`/servicos/${page.slug}`}
                  className="group border border-gray-200 p-5 transition hover:border-black"
                >
                  <h3 className="text-xl font-bold text-black transition group-hover:underline">{page.title}</h3>
                  <p className="mt-2 text-gray-700">{page.description || "Saiba mais sobre este serviço."}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {homeData.contact.email || homeData.contact.phone || homeData.contact.address || homeData.contact.time ? (
        <section id="contato-rapido" className="w-full border-t border-gray-200 py-10 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-black sm:text-3xl">Contato</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {homeData.contact.email ? (
                <div className="border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Email</h3>
                  <p className="mt-2 text-gray-800">{homeData.contact.email}</p>
                </div>
              ) : null}
              {homeData.contact.phone ? (
                <div className="border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Telefone</h3>
                  <p className="mt-2 text-gray-800">{homeData.contact.phone}</p>
                </div>
              ) : null}
              {homeData.contact.address ? (
                <div className="border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Endereço</h3>
                  <p className="mt-2 text-gray-800">{homeData.contact.address}</p>
                </div>
              ) : null}
              {homeData.contact.time ? (
                <div className="border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Horário</h3>
                  <p className="mt-2 text-gray-800">{homeData.contact.time}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
