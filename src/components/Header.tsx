"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              aria-label="Ir para a página inicial"
              title="TechMotors"
              className="text-2xl font-bold text-black transition hover:opacity-80"
            >
              Tech<span className="text-black">Motors</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-5">
            <Link
              href="/"
              aria-label="Home"
              title="Home"
              className="inline-flex items-center justify-center text-gray-700 transition hover:text-black"
            >
              <HomeIcon />
            </Link>
            <Link
              href="/servicos"
              aria-label="Serviços"
              title="Serviços"
              className="inline-flex items-center justify-center text-gray-700 transition hover:text-black"
            >
              <ServicesIcon />
            </Link>
            <Link
              href="/contato"
              aria-label="Contato"
              title="Contato"
              className="inline-flex items-center justify-center text-gray-700 transition hover:text-black"
            >
              <ContactIcon />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M6 10v10h12V10" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12h2" />
      <path d="M3 12h2" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M17 7l1.5-1.5" />
      <path d="M5.5 18.5L7 17" />
      <path d="M17 17l1.5 1.5" />
      <path d="M5.5 5.5L7 7" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </svg>
  );
}
