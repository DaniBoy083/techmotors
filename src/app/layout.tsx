import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TechMotors",
    default: "TechMotors - Oficina Especializada",
  },
  description: "TechMotors - Sua oficina de confiança para manutenção e reparo de veículos. Oferecemos serviços profissionais de manutenção preventiva, reparos e diagnóstico automotivo.",
  keywords: [
    "oficina",
    "manutenção automotiva",
    "reparo de carros",
    "mecânica",
    "serviços automotivos",
    "diagnóstico veicular",
    "TechMotors",
  ],
  authors: [{ name: "TechMotors" }],
  creator: "TechMotors",
  publisher: "TechMotors",
  openGraph: {
    title: "TechMotors - Oficina Especializada",
    description: "Sua oficina de confiança para manutenção e reparo de veículos",
    type: "website",
    locale: "pt_BR",
    siteName: "TechMotors",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
