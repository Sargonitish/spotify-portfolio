# 🎵 Spotify-Themed Developer Portfolio

An interactive, modern developer portfolio crafted in the style of the **Spotify Desktop & Web Player**. Built using **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 Highlights & Features

### 🎧 Authentic Spotify Web Player UI
- **Fixed Spotify Sidebar:** Classic navigation layout with quick jump links (`#home`, `#about`, `#skills`, `#projects`, `#experience`, `#certifications`, `#contact`), custom playlists section, and theme switcher.
- **Persistent "Now Playing" Bottom Bar:** Replicates the Spotify media player at the bottom of the screen featuring animated audio progress, like button, media controls, and volume slider.
- **Album-Style Project Showcase:** Projects presented as Spotify albums with cover artwork, gradient backdrops, and hovering green play buttons (`#1DB954`).

### ✨ Interactive Polish & Animations
- **Custom Dynamic Cursor:** Fluid custom cursor that magnetically scales and transitions when hovering over interactive elements (links, buttons, cards). Fully SSR-safe with zero hydration mismatch.
- **Connected Particle Canvas:** Lightweight HTML5 canvas particle network in the background that responds smoothly.
- **Top Scroll Progress Indicator:** Minimalist listening-progress style bar at the top of the viewport tracking your reading position.
- **Framer Motion Micro-Interactions:** Smooth entrance animations, hover transforms, and responsive transitions across all components.
- **Dark & Light Mode:** Spotify signature deep dark theme by default (`#121212`, `#181818`, `#282828`) with an alternative light mode, saved to `localStorage`.

---

## 📑 Portfolio Sections

| Section | Description |
| :--- | :--- |
| **Hero** | Profile avatar with verified badge, name, dynamic role description, and CTA buttons to view projects or contact. |
| **About** | Biography, education history, personal interests tags, and career aspirations. |
| **Skills** | Categorized skill breakdown (Frontend, Backend, Languages, DevOps, AI, Database) with proficiency percentage meters. |
| **Projects** | Grid of featured works with technology badges, live preview links, and GitHub repository links. |
| **Experience** | Career timeline highlighting company names, roles, tenure, and detailed bulleted achievements. |
| **Certifications** | Industry credentials and professional certifications with verification links. |
| **Contact** | Interactive contact form with client-side validation and direct social links (Email, LinkedIn, GitHub, Twitter). |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Static HTML Export)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom Spotify color palette and animations
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/) / [npm](https://www.npmjs.com/)

---

## 📁 Project Structure

```text
spotify-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/                       # Static assets (favicons, SVGs, resume.pdf)
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css           # Global CSS variables, Spotify themes & utilities
│   │   ├── layout.tsx            # HTML Root layout & metadata configuration
│   │   └── page.tsx              # Main single-page application entry point
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainContent.tsx   # Scrollable container for all sections
│   │   │   ├── NowPlaying.tsx    # Bottom Spotify music player bar
│   │   │   └── Sidebar.tsx       # Spotify desktop sidebar & mobile drawer
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx  # Bio, education, interests, career goals
│   │   │   ├── CertificationsSection.tsx # Verified credentials
│   │   │   ├── ContactSection.tsx# Contact form & validation
│   │   │   ├── ExperienceSection.tsx     # Work timeline
│   │   │   ├── HeroSection.tsx   # Verified artist header
│   │   │   ├── ProjectsSection.tsx       # Album grid
│   │   │   └── SkillsSection.tsx # Interactive skills & meters
│   │   ├── shared/
│   │   │   ├── AnimatedSection.tsx       # Scroll-triggered entrance wrapper
│   │   │   ├── CertificationCard.tsx     # Card component for credentials
│   │   │   ├── ExperienceCard.tsx        # Career entry card
│   │   │   ├── ProjectCard.tsx   # Spotify album-style project card
│   │   │   └── SkillRow.tsx      # Progress bar skill component
│   │   └── ui/
│   │       ├── CustomCursor.tsx  # Fluid custom cursor
│   │       ├── ParticleBackground.tsx    # Canvas particle background
│   │       ├── ScrollProgress.tsx# Top scroll progress bar
│   │       ├── SearchBar.tsx     # Filter input
│   │       └── ThemeToggle.tsx   # Dark/Light mode switch
│   ├── data/
│   │   └── portfolio.ts          # ⚡ ALL personal data, projects, and skills
│   ├── hooks/
│   │   ├── useScrollProgress.ts  # Scroll tracking hook
│   │   └── useTheme.ts           # Theme persistence hook
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for portfolio models
│   └── utils/
│       └── cn.ts                 # Classname merge utility (clsx + tailwind-merge)
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration (static export, dynamic basePath)
├── package.json                  # Dependencies & scripts
├── pnpm-lock.yaml                # Lockfile
├── postcss.config.mjs            # PostCSS plugins
├── tailwind.config.ts            # Tailwind custom Spotify theme extensions
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20.9.0 or higher
- **pnpm** (recommended) or **npm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sargonitish/spotify-portfolio.git
   cd spotify-portfolio
   ```

2. Install dependencies:
   ```bash
   # Using pnpm
   pnpm install --dangerously-allow-all-builds

   # Or using npm
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # Or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Customizing Your Portfolio

All website content is cleanly separated from UI logic. You can customize the entire website by modifying just **one file**:

### 1. Update Personal Data
Open `src/data/portfolio.ts` to change:
- **Personal Details:** Name, role title, bio, education, email, and social profiles.
- **Skills:** Add, edit, or remove skills, categories, and proficiency values (0-100%).
- **Projects:** Update project titles, descriptions, tags, GitHub repositories, and live demo links.
- **Work Experience:** Add past roles, dates, company names, and bulleted achievements.
- **Certifications:** Add certificates with organization names and verification URLs.

```typescript
// Example: src/data/portfolio.ts
export const portfolioData: PortfolioData = {
  name: "Your Name",
  role: "Full Stack Engineer",
  introduction: "Crafting digital experiences with modern web technologies.",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  // ...
};
```

### 2. Resume File
Replace `public/resume.pdf` with your own resume PDF file.

---

## 📦 Building for Production

To generate a static production export:

```bash
pnpm build
# Or
npm run build
```

This will produce an optimized static site inside the `out/` directory, ready to be hosted on any static hosting platform.

---

## 🌐 Deployment

### GitHub Pages (Automated via GitHub Actions)
This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your changes to the `main` branch.
2. In your GitHub repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically build the Next.js static site and deploy it to `https://<username>.github.io/<repo-name>/`.

### Vercel / Netlify
1. Import the repository in [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Framework preset: **Next.js**.
3. Deploy directly without needing extra configuration.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
