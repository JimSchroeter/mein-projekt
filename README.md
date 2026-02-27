# 🎮 Jermaine S. - Portfolio / Character Sheet

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-00ffff?style=for-the-badge&labelColor=black)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white&labelColor=black)
![React](https://img.shields.io/badge/React-19-00ffff?style=for-the-badge&logo=react&logoColor=00ffff&labelColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8&labelColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=for-the-badge&logo=framer&logoColor=ff69b4&labelColor=black)

<br>

<img src="public/next.svg" alt="Logo" width="200"/>

### ⚔️ LEVEL 35 SYSTEM ENGINEER ⚔️

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-00ffff?style=for-the-badge&logo=vercel&logoColor=black&labelColor=black)](https://deine-domain.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-JimSchroeter-ff69b4?style=for-the-badge&logo=github&logoColor=ff69b4&labelColor=black)](https://github.com/JimSchroeter)

</div>

---

## 📜 Über das Projekt

Ein **interaktives Portfolio** im Gaming-UI-Stil, das als persönliche "Character Sheet" gestaltet ist. Die Seite präsentiert meine Identität als **IT System Electronics Engineer** aus Berlin mit einer Leidenschaft für PC-Building – verpackt in ein modernes, hyperrealistisches Gaming-Interface.

### ✨ Features

| Kategorie | Features |
|-----------|----------|
| **🎯 Design** | • Gaming-inspiriertes UI mit Character-Stats<br>• PS1-Ästhetik mit modernem Touch<br>• Anime-Cyberpunk Background-Slider |
| **⚡ Animationen** | • Frostmourne Custom Cursor mit Ice-Effekten<br>• Hyperrealistischer Text-Glitch für Specializations<br>• Fliegende Gold-Transaktionen mit Fade-Effekt<br>• Pulsierende Rahmen bei Attributen |
| **🛠️ Interaktivität** | • Live-Gold-Simulation (alle 3 Sekunden)<br>• Hover-Effekte auf allen Karten<br>• Custom Cursor mit Varianten<br>• Mouse-Tracking für Gold-Floating |
| **📱 Responsive** | • Vollständig responsive für alle Devices<br>• Optimierte Grid-Layouts<br>• Mobile-first Design |

---

## 🚀 Technologie-Stack

### **Core**
- **[Next.js 15](https://nextjs.org/)** - React Framework mit App Router
- **[React 19](https://react.dev/)** - UI Library
- **[TypeScript](https://www.typescriptlang.org/)** - Typensicherheit

### **Styling & Animation**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Professionelle Animationen
- **[Styled JSX](https://github.com/vercel/styled-jsx)** - CSS-in-JS für komplexe Effekte
- **[Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)** - Retro-Gaming Font

---

## 📁 Projektstruktur
jermaine-portfolio/
├── app/
│ ├── page.tsx # Hauptkomponente (Character Sheet)
│ └── layout.tsx # Root Layout
├── public/
│ └── next.svg # Logo (optional)
├── styles/
│ └── globals.css # Globale Styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── .gitignore
└── README.md


---

## 🎮 Features im Detail

### **⚔️ Character Stats System**
- **STR (Stärke)**: Rot mit pulsierendem Rahmen
- **INT (Intelligenz)**: Blau mit sanftem Glow
- **AGI (Agilität)**: Grün mit dynamischem Schatten
- **STM (Stamina)**: Gelb mit warmem Leuchten

### **🗡️ Frostmourne Custom Cursor**
- **Design**: Lich King's Schwert mit Ice-Effekten
- **Animation**: Drehung bei Hover + schwebende Eis-Partikel
- **Technik**: `useEffect` für Maus-Tracking + Framer Motion Variants

### **💰 Live Gold System**
```tsx
// Automatische Gold-Generierung alle 3 Sekunden
- Zufälliger Gewinn (5-50 Gold)
- Fliegender Text mit Fade-Effekt
- Animierter Gold-Counter im Footer
- Transaktions-Historie mit AnimatePresence

🛠️ Installation & Setup
Voraussetzungen

    -Node.js 18+

    -npm / yarn / pnpm

    -Git

Quick Start

# Repository klonen
git clone https://github.com/JimSchroeter/mein-projekt.git

# In Verzeichnis wechseln
cd jermaine-portfolio

# Dependencies installieren
npm install
# oder
yarn install
# oder
pnpm install

# Development Server starten
npm run dev
# oder
yarn dev
# oder
pnpm dev

# Browser öffnen
# http://localhost:3000

Build für Production
# Production Build erstellen
npm run build

# Production Server starten
npm run start

