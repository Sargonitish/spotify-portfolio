import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${portfolioData.name} | ${portfolioData.role}`,
  description: portfolioData.introduction,
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "react",
    "next.js",
    "typescript",
    portfolioData.name,
  ],
  openGraph: {
    title: `${portfolioData.name} | Spotify Portfolio`,
    description: portfolioData.introduction,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
