"use client";

import { useState } from "react";

const defaultSections = [
  { id: "troca-de-oleo", label: "Troca de Óleo" },
  { id: "manutencao-especializada", label: "Manutenção Especializada" },
  { id: "alinhamento-balanceamento", label: "Alinhamento e Balanceamento" },
];

type HomeServicesSubmenuProps = {
  sections?: Array<{
    id: string;
    label: string;
  }>;
};

export default function HomeServicesSubmenu({ sections = defaultSections }: HomeServicesSubmenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      aria-label="Submenu de serviços da home"
      className="w-full bg-white md:sticky md:top-16 md:z-40"
    >
      <div className="mx-auto flex max-w-7xl justify-start px-4 py-1 md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="home-services-links"
          aria-label={isOpen ? "Esconder submenu" : "Mostrar submenu"}
          className="inline-flex items-center gap-3 px-1 py-2 text-black transition-colors duration-300 hover:text-gray-700"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
          <span className="text-lg font-semibold leading-none sm:text-xl">Menu</span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul
          id="home-services-links"
          className="mx-auto flex max-w-7xl flex-col items-stretch gap-2 px-4 py-3"
        >
          {sections.map((section) => (
            <li key={section.id} className="w-full">
              <a
                href={`#${section.id}`}
                className="inline-flex w-full justify-center rounded-none border border-black bg-black px-4 py-2 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-900"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mx-auto hidden max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-1 sm:gap-4 sm:px-6 lg:px-8 md:flex">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-flex rounded-none border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-900"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
