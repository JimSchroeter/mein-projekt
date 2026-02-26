"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Interface für Gold-Transaktionen
interface GoldTransaction {
  id: number;
  amount: number;
  x: number;
  y: number;
}

export default function Home() {
  const [glitchText, setGlitchText] = useState("> Jermaine S. // System Electronics Engineer");
  const [birthYear] = useState("1989");
  const [location] = useState("Berlin, Germany");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [gold, setGold] = useState(12450);
  const [transactions, setTransactions] = useState<GoldTransaction[]>([]);
  const [transactionId, setTransactionId] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(true);
  
  // Ice particles - FIXED POSITIONS (ohne Math.random())
  const iceParticles = [
    { top: "10%", left: "20%" },
    { top: "30%", left: "70%" },
    { top: "60%", left: "40%" }
  ];

  // Floating particles - FIXED POSITIONS (ohne Math.random())
  const floatingParticles = [
    { x: 150, y: 200 },
    { x: 300, y: 400 },
    { x: 500, y: 100 },
    { x: 700, y: 500 },
    { x: 200, y: 600 },
    { x: 800, y: 300 },
    { x: 400, y: 700 },
    { x: 600, y: 200 },
    { x: 250, y: 450 },
    { x: 750, y: 550 },
    { x: 350, y: 150 },
    { x: 450, y: 650 },
    { x: 550, y: 350 },
    { x: 650, y: 450 },
    { x: 850, y: 250 },
    { x: 150, y: 750 },
    { x: 500, y: 500 },
    { x: 300, y: 300 },
    { x: 700, y: 700 },
    { x: 400, y: 400 }
  ];

  // Nach dem Mounten setzen für client-seitige Features
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Gold income simulation mit fliegendem Text
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      // Random gold income zwischen 5 und 50 gold
      const income = Math.floor(Math.random() * 45) + 5;
      
      // Zufällige Position für den fliegenden Text (im Bereich des Gold Counters)
      const randomX = Math.random() * 100 - 50; // -50 bis 50 Pixel
      const randomY = Math.random() * 30 - 15; // -15 bis 15 Pixel
      
      // Neue Transaktion hinzufügen
      const newTransaction = {
        id: transactionId,
        amount: income,
        x: randomX,
        y: randomY
      };
      
      setTransactions(prev => [...prev, newTransaction]);
      setTransactionId(prev => prev + 1);
      setGold(prev => prev + income);
      
      // Transaktion nach 2 Sekunden entfernen
      setTimeout(() => {
        setTransactions(prev => prev.filter(t => t.id !== newTransaction.id));
      }, 2000);
      
    }, 3000); // Alle 3 Sekunden

    return () => clearInterval(interval);
  }, [transactionId, isMounted]);

  // Custom cursor tracking
  useEffect(() => {
    if (!isMounted) return;
    
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [isMounted]);

  // Anime background images rotation
  const [bgImage, setBgImage] = useState(0);
  const animeBackgrounds = [
    "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?q=80&w=2070", // Cyberpunk city
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070", // Neon samurai
    "https://images.unsplash.com/photo-1563089145-599f8f12f6e3?q=80&w=2070", // Fantasy landscape
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070", // Gaming setup
  ];

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setBgImage((prev) => (prev + 1) % animeBackgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isMounted]);

  // Frostmourne cursor variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      rotate: 0,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      rotate: 45,
      scale: 1.5,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  // Während SSR nur eine minimale Version zeigen (ohne client-spezifische Features)
  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-black font-mono flex items-center justify-center">
        <div className="text-cyan-400">Loading Matrix...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-gaming overflow-hidden cursor-none">
      {/* Fliegende Gold-Transaktionen - HALB SO GROß */}
      <AnimatePresence>
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            className="fixed pointer-events-none z-50 text-yellow-400 font-bold text-sm"
            initial={{ 
              opacity: 1, 
              scale: 1,
              x: mousePosition.x - 20 + transaction.x,
              y: mousePosition.y - 40 + transaction.y
            }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              y: mousePosition.y - 80 + transaction.y
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            +{transaction.amount} 🪙
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Custom Frostmourne Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="relative w-8 h-8">
          {/* Frostmourne blade */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
            {/* Sword blade */}
            <motion.path
              d="M50 10 L60 40 L55 45 L52 60 L48 60 L45 45 L40 40 L50 10"
              fill="url(#iceGradient)"
              stroke="#a0f0ff"
              strokeWidth="2"
              animate={{
                filter: [
                  "drop-shadow(0 0 2px #00ffff)",
                  "drop-shadow(0 0 8px #00ffff)",
                  "drop-shadow(0 0 2px #00ffff)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Skull hilt */}
            <circle cx="50" cy="65" r="8" fill="#2a4a5a" stroke="#8ccbd9" strokeWidth="2" />
            <circle cx="46" cy="62" r="1.5" fill="#ff0000" />
            <circle cx="54" cy="62" r="1.5" fill="#ff0000" />
            <path d="M45 70 L55 70" stroke="#8ccbd9" strokeWidth="2" />
            {/* Ice effects */}
            <path d="M30 30 L35 25" stroke="#00ffff" strokeWidth="2" opacity="0.6" />
            <path d="M70 30 L65 25" stroke="#00ffff" strokeWidth="2" opacity="0.6" />
            <defs>
              <linearGradient id="iceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a0f0ff" />
                <stop offset="50%" stopColor="#4a9fb1" />
                <stop offset="100%" stopColor="#1e4a5a" />
              </linearGradient>
            </defs>
          </svg>
          {/* Ice particles - JETZT MIT FIXED POSITIONS */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {iceParticles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                style={{
                  top: particle.top,
                  left: particle.left,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Anime Background with Parallax */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          backgroundImage: `url(${animeBackgrounds[bgImage]})`,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) saturate(1.2)",
        }}
      >
        {/* Animated overlay for gaming effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-black/50" />
        
        {/* Floating particles - JETZT MIT FIXED POSITIONS */}
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              y: [0, -30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Main content with gaming style */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto px-6 sm:px-16 py-16">
        {/* Glassmorphism card with gaming aesthetics */}
        <motion.div
          className="w-full bg-black/40 backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8 space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setCursorVariant("hover")}
          onHoverEnd={() => setCursorVariant("default")}
        >
          {/* Gaming-inspired header with RGB effect */}
          <motion.div
            className="text-center space-y-2"
            animate={{ textShadow: ["0 0 10px cyan", "0 0 20px blue", "0 0 10px cyan"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              JERMAINE S.
            </h1>
            <div className="flex justify-center gap-2 text-lg text-cyan-300">
              <span className="animate-pulse">⚔️</span>
              <span>LEVEL 35 SYSTEM ENGINEER</span>
              <span className="animate-pulse">⚔️</span>
            </div>
          </motion.div>

          {/* Character Stats - NUR STR ist rot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {/* STR - Rot */}
            <motion.div
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3"
              whileHover={{ scale: 1.05, borderColor: "#00ffff" }}
            >
              <div className="text-red-500 font-bold text-lg">STR</div>
              <div className="text-2xl text-white">92</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <motion.div
                  className="bg-red-500 h-1 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>

            {/* INT - Blau */}
            <motion.div
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3"
              whileHover={{ scale: 1.05, borderColor: "#00ffff" }}
            >
              <div className="text-blue-400 font-bold text-lg">INT</div>
              <div className="text-2xl text-white">95</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <motion.div
                  className="bg-blue-500 h-1 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 1, delay: 0.1 }}
                />
              </div>
            </motion.div>

            {/* AGI - Grün */}
            <motion.div
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3"
              whileHover={{ scale: 1.05, borderColor: "#00ffff" }}
            >
              <div className="text-green-400 font-bold text-lg">AGI</div>
              <div className="text-2xl text-white">78</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <motion.div
                  className="bg-green-500 h-1 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>

            {/* STM - Gelb */}
            <motion.div
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3"
              whileHover={{ scale: 1.05, borderColor: "#00ffff" }}
            >
              <div className="text-yellow-400 font-bold text-lg">STM</div>
              <div className="text-2xl text-white">88</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <motion.div
                  className="bg-yellow-500 h-1 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Character Bio with gaming theme */}
          <motion.div
            className="space-y-3 text-cyan-300/80 border-l-4 border-cyan-500 pl-4 bg-black/30 p-4 rounded-r-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="flex items-center gap-2">
              <span className="text-yellow-400">🏰</span> Location: {location}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-400">⚙️</span> Class: IT System Electronics Engineer
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-400">🖥️</span> Specializations: 
              <span className="glitch-holographic" data-text=" Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage">
                 Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">📅</span> Born: {birthYear}
            </p>
          </motion.div>

          {/* GitHub as a quest item */}
          <motion.a
            href="https://github.com/JimSchroeter"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setCursorVariant("hover")}
            onHoverEnd={() => setCursorVariant("default")}
          >
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-cyan-500/50 rounded-xl hover:border-yellow-400 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📜</span>
                <div>
                  <div className="text-yellow-400 font-bold">QUEST: Connect with Developer</div>
                  <div className="text-cyan-300">github.com/JimSchroeter</div>
                </div>
              </div>
              <div className="text-2xl animate-pulse">→</div>
            </div>
          </motion.a>

          {/* JERMAINE'S EXACT MAIN RIG */}
          <div className="space-y-3">
            <h2 className="text-xl text-yellow-400 flex items-center gap-2">
              <span>⚡</span> JERMAINE'S MAIN RIG - CUSTOM BUILD
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* CPU - Legendary */}
              <motion.div
                className="bg-black/60 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px #ffd700" }}
              >
                <div className="text-yellow-400 font-bold text-xs mb-1">👑 [LEGENDARY]</div>
                <div className="text-white text-sm">Intel Core i7-12700K</div>
                <div className="text-cyan-400 text-xs">4.8GHz (OC)</div>
              </motion.div>

              {/* RAM - Epic */}
              <motion.div
                className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px purple" }}
              >
                <div className="text-purple-400 font-bold text-xs mb-1">[EPIC]</div>
                <div className="text-white text-sm">Corsair Vengeance RGB PRO</div>
                <div className="text-purple-300 text-xs">32GB (2x16) DDR4 3600MHz</div>
              </motion.div>

              {/* GPU - Legendary */}
              <motion.div
                className="bg-black/60 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px #ffd700" }}
              >
                <div className="text-yellow-400 font-bold text-xs mb-1">👑 [LEGENDARY]</div>
                <div className="text-white text-sm">Gigabyte RTX 3070 Ti</div>
                <div className="text-cyan-400 text-xs">8GB GDDR6X</div>
              </motion.div>

              {/* Mainboard - Rare */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">MSI Pro Z690-A</div>
                <div className="text-blue-300 text-xs">DDR4 • PCIe 5.0</div>
              </motion.div>

              {/* SSD - Epic */}
              <motion.div
                className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px purple" }}
              >
                <div className="text-purple-400 font-bold text-xs mb-1">[EPIC]</div>
                <div className="text-white text-sm">Samsung 980 PRO</div>
                <div className="text-purple-300 text-xs">1TB NVMe PCIe 4.0</div>
              </motion.div>

              {/* PSU - Rare */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">be quiet! Pure Power 11 FM</div>
                <div className="text-blue-300 text-xs">1000W • 80+ Gold</div>
              </motion.div>

              {/* Case - Rare */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">be quiet! Dark Base 900 Pro</div>
                <div className="text-blue-300 text-xs">Full Tower • Soundproof</div>
              </motion.div>

              {/* Monitor - Rare */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">ASUS MG278Q</div>
                <div className="text-blue-300 text-xs">144Hz • 1ms • 2K WQHD</div>
              </motion.div>

              {/* Webcam - Common */}
              <motion.div
                className="bg-black/60 border border-gray-500/30 rounded-lg p-3 text-center hover:border-gray-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px gray" }}
              >
                <div className="text-gray-400 font-bold text-xs mb-1">[COMMON]</div>
                <div className="text-white text-sm">Logitech HD Pro C920</div>
                <div className="text-gray-300 text-xs">1080p • Streaming</div>
              </motion.div>
            </div>
          </div>

          {/* Networking & Troubleshooting Skills */}
          <div className="space-y-3">
            <h2 className="text-xl text-green-400 flex items-center gap-2">
              <span>🌐</span> SKILL TREE - NETWORKING & TROUBLESHOOTING
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { skill: "BGP • OSPF • MPLS", level: 90 },
                { skill: "Wireshark • Packet Analysis", level: 95 },
                { skill: "Firewalls • VLANs • VPNs", level: 88 },
                { skill: "Cloud (AWS/Azure/GCP)", level: 85 },
                { skill: "Root Cause Analysis", level: 92 },
                { skill: "Automation (Python/Ansible)", level: 82 }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-black/60 border border-green-500/30 rounded-lg p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-green-400 text-xs mb-1">{skill.skill}</div>
                  <div className="w-full bg-gray-700 h-1.5 rounded">
                    <motion.div
                      className="bg-green-500 h-1.5 rounded"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">EXPERIENCE</span>
              <span className="text-yellow-400">LVL 35 ▸ 36</span>
            </div>
            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden border border-cyan-500/50">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Footer with gaming stats - Animated Gold */}
          <motion.div
            className="flex justify-between text-xs text-cyan-500/70 border-t border-cyan-500/30 pt-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>HP: ████████ 8923/8923</span>
            <span>MANA: ██████ 432/560</span>
            <motion.span
              className="text-yellow-400 font-bold relative"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              GOLD: 🪙 {gold.toLocaleString()}
            </motion.span>
          </motion.div>
        </motion.div>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .font-gaming {
          font-family: 'Press Start 2P', cursive;
        }

        /* LANGSAMER HOLOGRAPHISCHER GLITCH EFFEKT */
        .glitch-holographic {
          position: relative;
          color: #00ffff;
          font-weight: bold;
          display: inline-block;
          animation: holographic-shimmer 8s infinite ease-in-out;
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.5),
            0 0 20px rgba(0, 255, 255, 0.3),
            0 0 30px rgba(0, 255, 255, 0.2);
        }

        .glitch-holographic::before,
        .glitch-holographic::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
          opacity: 0.4;
          mix-blend-mode: screen;
        }

        .glitch-holographic::before {
          animation: glitch-slow-1 6s infinite ease-in-out;
          color: #ff00c1;
          transform: translate(-3px, -2px);
          filter: blur(1px);
          text-shadow: 0 0 15px #ff00c1;
        }

        .glitch-holographic::after {
          animation: glitch-slow-2 7s infinite ease-in-out;
          color: #00fff9;
          transform: translate(3px, 2px);
          filter: blur(1px);
          text-shadow: 0 0 15px #00fff9;
        }

        @keyframes holographic-shimmer {
          0%, 100% { 
            filter: hue-rotate(0deg);
            opacity: 1;
          }
          25% { 
            filter: hue-rotate(10deg);
            opacity: 0.95;
          }
          50% { 
            filter: hue-rotate(20deg);
            opacity: 0.9;
          }
          75% { 
            filter: hue-rotate(10deg);
            opacity: 0.95;
          }
        }

        @keyframes glitch-slow-1 {
          0%, 100% { 
            clip-path: inset(0 0 0 0);
            transform: translate(-3px, -2px);
            opacity: 0.3;
          }
          20% { 
            clip-path: inset(10% 0 20% 0);
            transform: translate(-4px, -3px);
            opacity: 0.5;
          }
          40% { 
            clip-path: inset(30% 0 10% 0);
            transform: translate(-2px, -4px);
            opacity: 0.4;
          }
          60% { 
            clip-path: inset(50% 0 5% 0);
            transform: translate(-5px, -1px);
            opacity: 0.6;
          }
          80% { 
            clip-path: inset(15% 0 35% 0);
            transform: translate(-1px, -5px);
            opacity: 0.3;
          }
        }

        @keyframes glitch-slow-2 {
          0%, 100% { 
            clip-path: inset(0 0 0 0);
            transform: translate(3px, 2px);
            opacity: 0.3;
          }
          20% { 
            clip-path: inset(25% 0 15% 0);
            transform: translate(4px, 3px);
            opacity: 0.5;
          }
          40% { 
            clip-path: inset(45% 0 25% 0);
            transform: translate(2px, 4px);
            opacity: 0.4;
          }
          60% { 
            clip-path: inset(60% 0 10% 0);
            transform: translate(5px, 1px);
            opacity: 0.6;
          }
          80% { 
            clip-path: inset(35% 0 40% 0);
            transform: translate(1px, 5px);
            opacity: 0.3;
          }
        }

        /* Zusätzlicher sanfter Bewegungseffekt */
        .glitch-holographic span {
          display: inline-block;
          animation: float-text 10s infinite ease-in-out;
        }

        @keyframes float-text {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-1px); }
          50% { transform: translateY(1px); }
          75% { transform: translateY(-1px); }
        }
      `}</style>
    </div>
  );
}
