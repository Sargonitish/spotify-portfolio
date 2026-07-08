import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Doe | Full Stack Developer & AI Enthusiast",
  description:
    "Personal portfolio website showcasing projects, skills, and experience in full-stack development and AI.",
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "react",
    "next.js",
    "typescript",
  ],
  openGraph: {
    title: "John Doe | Full Stack Developer",
    description:
      "Full Stack Developer & AI Enthusiast - Crafting digital experiences.",
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
