import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex App",
  description:
    "Explora el mundo pokémon y conoce más sobre ellos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://kit.fontawesome.com/a05a04c191.js"
          crossOrigin="anonymous"
        />
        <div className="flex min-h-screen flex-col items-center p-6 font-sans">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
