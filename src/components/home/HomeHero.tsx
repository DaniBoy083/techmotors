import Image from "next/image";

type HomeHeroProps = {
  heading: string;
  buttonTitle: string;
  buttonUrl: string;
  bannerUrl: string;
};

export default function HomeHero({ heading, buttonTitle, buttonUrl, bannerUrl }: HomeHeroProps) {
  const isExternalLink = /^https?:\/\//i.test(buttonUrl);
  const hasCta = buttonTitle.trim() !== "" && buttonUrl.trim() !== "";

  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h1 className="mb-3 text-3xl font-bold text-black sm:mb-4 sm:text-4xl">{heading}</h1>
      </main>

      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-gray-200">
        <Image
          src={bannerUrl}
          alt="Imagem da oficina no hero"
          width={1200}
          height={700}
          className="block h-55 w-screen object-cover sm:h-75 md:h-105"
          priority
        />

        <div className="absolute inset-0 bg-black/35" />

        {hasCta ? (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <a
              href={buttonUrl}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center border border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {buttonTitle}
            </a>
          </div>
        ) : null}
      </section>
    </>
  );
}
