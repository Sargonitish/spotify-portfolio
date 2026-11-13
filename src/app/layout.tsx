import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
