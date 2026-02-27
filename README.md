# ⚔️ Jermaine S. – Portfolio / Character Sheet

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-00ffff?style=for-the-badge&labelColor=black)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white&labelColor=black)
![React](https://img.shields.io/badge/React-19-00ffff?style=for-the-badge&logo=react&logoColor=00ffff&labelColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8&labelColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=for-the-badge&logo=framer&logoColor=ff69b4&labelColor=black)

<br>

<img src="/vercel.svg" alt="Logo" width="200"/>

### 🎮 LEVEL 35 – SYSTEM ENGINEER

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-00ffff?style=for-the-badge&logo=vercel&logoColor=black&labelColor=black)](https://mein-projekt.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-JimSchroeter-ff69b4?style=for-the-badge&logo=github&logoColor=ff69b4&labelColor=black)](https://github.com/JimSchroeter/mein-projekt)

</div>

---

## 📜 Über das Projekt

Ein **interaktives Portfolio** im Gaming-UI-Stil, gestaltet als persönliches „Character Sheet“.  
Die Seite präsentiert mich als **IT-Systemelektroniker** aus Berlin mit einer Leidenschaft für PC-Building und Retro-Gaming-Ästhetik – verpackt in ein hyperrealistisches Gaming-Interface.

### ✨ Features

| Kategorie             | Features                                                                                  |
|----------------------|-------------------------------------------------------------------------------------------|
| **🎯 Design**         | • Gaming-inspiriertes UI mit Character-Stats<br>• PS1-Ästhetik trifft modernes Design<br>• Anime-Cyberpunk Background-Slider |
| **⚡ Animationen**     | • Frostmourne Custom Cursor mit Eis-Effekten<br>• Text-Glitch bei Specializations<br>• Fliegende Gold-Transaktionen mit Fade-Effekt<br>• Pulsierende Rahmen bei Attributen |
| **🛠️ Interaktivität** | • Live-Gold-System (alle 3 Sekunden)<br>• Hover-Effekte auf allen Karten<br>• Custom Cursor mit Varianten<br>• Mouse-Tracking für Gold-Floating |
| **📱 Responsive**      | • Vollständig responsive<br>• Optimierte Grid-Layouts<br>• Mobile-First-Design           |

---

## 🚀 Technologie-Stack

### Core
- **[Next.js 15](https://nextjs.org/)** – App Router, Server Components
- **[React 19](https://react.dev/)** – Modernste UI-Bibliothek
- **[TypeScript](https://www.typescriptlang.org/)** – Typsicherheit und bessere DX

### Styling & Animation
- **[Tailwind CSS 4](https://tailwindcss.com/)** – Utility-first Styling
- **[Framer Motion](https://www.framer.com/motion/)** – Performante Animationen
- **[Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)** – Retro-Gaming Font

---

## 📁 Projektstruktur
---
mein-projekt/<br>
├── app/<br>
│ ├── page.tsx # Hauptkomponente (Character Sheet)<br>
│ └── layout.tsx # Root Layout mit Metadaten<br>
├── public/<br>
│ └── (Bilder, Icons) # Statische Assets<br>
├── styles/<br>
│ └── globals.css # Globale Styles und Tailwind-Imports<br>
├── package.json<br>
├── tsconfig.json<br>
├── tailwind.config.js<br>
├── postcss.config.js<br>
├── next.config.js<br>
├── .gitignore<br>
└── README.md

## ⚔️ Features im Detail

### Character Stats System
| Attribut | Farbe   | Effekt                      |
|----------|---------|-----------------------------|
| **STR**  | Rot     | Pulsierender Rahmen         |
| **INT**  | Blau    | Sanfter Glow                |
| **AGI**  | Grün    | Dynamischer Schatten        |
| **STM**  | Gelb    | Warmes Leuchten             |

### 🗡️ Frostmourne Custom Cursor
- Design inspiriert vom **Lich King**-Schwert
- Drehung bei Hover + schwebende Eis-Partikel
- Umgesetzt mit `useEffect` + Framer Motion Variants

### 💰 Live-Gold-System
```tsx
// Automatische Generierung alle 3 Sekunden
- Zufälliger Gewinn zwischen 5–50 Gold
- Fliegende Textanimation mit Fade-Out
- Live-Counter im Footer
- Animierte Transaktions-Historie

🛠️ Installation & Setup
Voraussetzungen

    - Node.js 18 oder höher

    - npm, yarn oder pnpm

    - Git

Quick Start

# Repository klonen (SSH)
git clone git@github.com:JimSchroeter/mein-projekt.git

# In Verzeichnis wechseln
cd mein-projekt

# Dependencies installieren
npm install

# Development Server starten
npm run dev

Öffne http://localhost:3000 im Browser.

Production Build
# Optimierten Build erstellen
npm run build

# Production Server starten
npm run start

📄 Lizenz

Dieses Projekt ist lizenziert unter der MIT-Lizenz.
Siehe LICENSE für weitere Informationen.

<div align="center">

👾 Gegrinded mit 💙 in Berlin – Level 35 System Engineer 👾

⬆ Zurück nach oben
</div> ```
