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
  
  // Ice particles - FIXED POSITIONS
  const iceParticles = [
    { top: "10%", left: "20%" },
    { top: "30%", left: "70%" },
    { top: "60%", left: "40%" }
  ];

  // Floating particles - FIXED POSITIONS
  const floatingParticles = [
    { x: 150, y: 200 }, { x: 300, y: 400 }, { x: 500, y: 100 },
    { x: 700, y: 500 }, { x: 200, y: 600 }, { x: 800, y: 300 },
    { x: 400, y: 700 }, { x: 600, y: 200 }, { x: 250, y: 450 },
    { x: 750, y: 550 }, { x: 350, y: 150 }, { x: 450, y: 650 },
    { x: 550, y: 350 }, { x: 650, y: 450 }, { x: 850, y: 250 },
    { x: 150, y: 750 }, { x: 500, y: 500 }, { x: 300, y: 300 },
    { x: 700, y: 700 }, { x: 400, y: 400 }
  ];

  // Nach dem Mounten setzen für client-seitige Features
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Gold income simulation
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      const income = Math.floor(Math.random() * 45) + 5;
      const randomX = Math.random() * 100 - 50;
      const randomY = Math.random() * 30 - 15;
      
      const newTransaction = {
        id: transactionId,
        amount: income,
        x: randomX,
        y: randomY
      };
      
      setTransactions(prev => [...prev, newTransaction]);
      setTransactionId(prev => prev + 1);
      setGold(prev => prev + income);
      
      setTimeout(() => {
        setTransactions(prev => prev.filter(t => t.id !== newTransaction.id));
      }, 2000);
      
    }, 3000);

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
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [isMounted]);

  // Anime background rotation
  const [bgImage, setBgImage] = useState(0);
  const animeBackgrounds = [
    "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?q=80&w=2070",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070",
    "https://images.unsplash.com/photo-1563089145-599f8f12f6e3?q=80&w=2070",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070",
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

  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-black font-mono flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-gaming overflow-hidden cursor-none">
      {/* Fliegende Gold-Transaktionen */}
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
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
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
            <circle cx="50" cy="65" r="8" fill="#2a4a5a" stroke="#8ccbd9" strokeWidth="2" />
            <circle cx="46" cy="62" r="1.5" fill="#ff0000" />
            <circle cx="54" cy="62" r="1.5" fill="#ff0000" />
            <path d="M45 70 L55 70" stroke="#8ccbd9" strokeWidth="2" />
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

      {/* Animated Anime Background */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-black/50" />
        
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

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto px-6 sm:px-16 py-16">
        <motion.div
          className="w-full bg-black/40 backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8 space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setCursorVariant("hover")}
          onHoverEnd={() => setCursorVariant("default")}
        >
          {/* Header */}
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

          {/* Character Stats mit leichtem Rahmen-Effekt */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {/* STR - Rot */}
            <motion.div
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 attribute-card"
              whileHover={{ scale: 1.05 }}
              animate={{
                borderColor: ["rgba(0,255,255,0.3)", "rgba(255,0,0,0.5)", "rgba(0,255,255,0.3)"],
                boxShadow: [
                  "0 0 5px rgba(0,255,255,0.2)",
                  "0 0 15px rgba(255,0,0,0.3)",
                  "0 0 5px rgba(0,255,255,0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
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
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 attribute-card"
              whileHover={{ scale: 1.05 }}
              animate={{
                borderColor: ["rgba(0,255,255,0.3)", "rgba(0,0,255,0.5)", "rgba(0,255,255,0.3)"],
                boxShadow: [
                  "0 0 5px rgba(0,255,255,0.2)",
                  "0 0 15px rgba(0,0,255,0.3)",
                  "0 0 5px rgba(0,255,255,0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
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
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 attribute-card"
              whileHover={{ scale: 1.05 }}
              animate={{
                borderColor: ["rgba(0,255,255,0.3)", "rgba(0,255,0,0.5)", "rgba(0,255,255,0.3)"],
                boxShadow: [
                  "0 0 5px rgba(0,255,255,0.2)",
                  "0 0 15px rgba(0,255,0,0.3)",
                  "0 0 5px rgba(0,255,255,0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
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
              className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 attribute-card"
              whileHover={{ scale: 1.05 }}
              animate={{
                borderColor: ["rgba(0,255,255,0.3)", "rgba(255,255,0,0.5)", "rgba(0,255,255,0.3)"],
                boxShadow: [
                  "0 0 5px rgba(0,255,255,0.2)",
                  "0 0 15px rgba(255,255,0,0.3)",
                  "0 0 5px rgba(0,255,255,0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
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

          {/* Character Bio */}
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
              <span className="glitch-hyperrealistic" data-text=" Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage">
                 Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">📅</span> Born: {birthYear}
            </p>
          </motion.div>

          {/* GitHub Quest */}
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

          {/* Main Rig */}
          <div className="space-y-3">
            <h2 className="text-xl text-yellow-400 flex items-center gap-2">
              <span>⚡</span> JERMAINE'S MAIN RIG - CUSTOM BUILD
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* CPU */}
              <motion.div
                className="bg-black/60 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px #ffd700" }}
              >
                <div className="text-yellow-400 font-bold text-xs mb-1">👑 [LEGENDARY]</div>
                <div className="text-white text-sm">Intel Core i7-12700K</div>
                <div className="text-cyan-400 text-xs">4.8GHz (OC)</div>
              </motion.div>

              {/* RAM */}
              <motion.div
                className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px purple" }}
              >
                <div className="text-purple-400 font-bold text-xs mb-1">[EPIC]</div>
                <div className="text-white text-sm">Corsair Vengeance RGB PRO</div>
                <div className="text-purple-300 text-xs">32GB (2x16) DDR4 3600MHz</div>
              </motion.div>

              {/* GPU */}
              <motion.div
                className="bg-black/60 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px #ffd700" }}
              >
                <div className="text-yellow-400 font-bold text-xs mb-1">👑 [LEGENDARY]</div>
                <div className="text-white text-sm">Gigabyte RTX 3070 Ti</div>
                <div className="text-cyan-400 text-xs">8GB GDDR6X</div>
              </motion.div>

              {/* Mainboard */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">MSI Pro Z690-A</div>
                <div className="text-blue-300 text-xs">DDR4 • PCIe 5.0</div>
              </motion.div>

              {/* SSD */}
              <motion.div
                className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px purple" }}
              >
                <div className="text-purple-400 font-bold text-xs mb-1">[EPIC]</div>
                <div className="text-white text-sm">Samsung 980 PRO</div>
                <div className="text-purple-300 text-xs">1TB NVMe PCIe 4.0</div>
              </motion.div>

              {/* PSU */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">be quiet! Pure Power 11 FM</div>
                <div className="text-blue-300 text-xs">1000W • 80+ Gold</div>
              </motion.div>

              {/* Case */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">be quiet! Dark Base 900 Pro</div>
                <div className="text-blue-300 text-xs">Full Tower • Soundproof</div>
              </motion.div>

              {/* Monitor */}
              <motion.div
                className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all"
                whileHover={{ y: -5, boxShadow: "0 0 20px blue" }}
              >
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">ASUS MG278Q</div>
                <div className="text-blue-300 text-xs">144Hz • 1ms • 2K WQHD</div>
              </motion.div>

              {/* Webcam */}
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

          {/* Skills */}
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

          {/* Footer */}
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

        /* Leichter Rahmen-Effekt für Attribute */
        .attribute-card {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .attribute-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            transparent 30%,
            rgba(0, 255, 255, 0.1) 50%,
            transparent 70%
          );
          border-radius: 10px;
          z-index: -1;
          animation: borderGlow 3s linear infinite;
        }

        @keyframes borderGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* HYPERREALISTISCHER GLITCH EFFEKT */
        .glitch-hyperrealistic {
          position: relative;
          color: #00ffff;
          font-weight: bold;
          display: inline-block;
          animation: 
            hyper-glitch 4s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94),
            sideways-move 2s infinite ease-in-out;
          text-shadow: 
            0 0 2px rgba(0, 255, 255, 0.8),
            0 0 4px rgba(255, 0, 255, 0.5),
            0 0 6px rgba(0, 255, 0, 0.3);
          filter: contrast(1.2) brightness(1.1);
        }

        .glitch-hyperrealistic::before,
        .glitch-hyperrealistic::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .glitch-hyperrealistic::before {
          animation: 
            glitch-rgb-1 0.8s infinite steps(1),
            sideways-move 2.1s infinite ease-in-out;
          color: #ff0000;
          filter: blur(0.3px);
          opacity: 0.7;
          text-shadow: 0 0 5px #ff0000;
        }

        .glitch-hyperrealistic::after {
          animation: 
            glitch-rgb-2 0.9s infinite steps(1),
            sideways-move 1.9s infinite ease-in-out;
          color: #0000ff;
          filter: blur(0.3px);
          opacity: 0.7;
          text-shadow: 0 0 5px #0000ff;
        }

        @keyframes sideways-move {
          0% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(8px); }
          100% { transform: translateX(0); }
        }

        @keyframes hyper-glitch {
          0%, 100% { 
            transform: skew(0deg) scale(1);
            filter: hue-rotate(0deg) contrast(1.2);
          }
          10% { 
            transform: skew(0.5deg) scale(1.01);
            filter: hue-rotate(5deg) contrast(1.3);
          }
          20% { 
            transform: skew(-0.3deg) scale(0.99);
            filter: hue-rotate(-3deg) contrast(1.1);
          }
          30% { 
            transform: skew(0.8deg) scale(1.02);
            filter: hue-rotate(8deg) contrast(1.4);
          }
          40% { 
            transform: skew(-0.5deg) scale(0.98);
            filter: hue-rotate(-5deg) contrast(1.2);
          }
          50% { 
            transform: skew(0deg) scale(1);
            filter: hue-rotate(0deg) contrast(1.2);
          }
          60% { 
            transform: skew(0.2deg) scale(1.01);
            filter: hue-rotate(2deg) contrast(1.3);
          }
          70% { 
            transform: skew(-0.4deg) scale(0.99);
            filter: hue-rotate(-4deg) contrast(1.1);
          }
          80% { 
            transform: skew(0.6deg) scale(1.02);
            filter: hue-rotate(6deg) contrast(1.4);
          }
          90% { 
            transform: skew(-0.2deg) scale(0.99);
            filter: hue-rotate(-2deg) contrast(1.2);
          }
        }

        @keyframes glitch-rgb-1 {
          0%, 100% { clip-path: inset(0 0 0 0); opacity: 0.7; }
          10% { clip-path: inset(10% 0 20% 0); opacity: 0.8; }
          20% { clip-path: inset(40% 0 10% 0); opacity: 0.6; }
          30% { clip-path: inset(60% 0 5% 0); opacity: 0.9; }
          40% { clip-path: inset(20% 0 50% 0); opacity: 0.7; }
          50% { clip-path: inset(80% 0 10% 0); opacity: 0.8; }
          60% { clip-path: inset(30% 0 30% 0); opacity: 0.6; }
          70% { clip-path: inset(50% 0 20% 0); opacity: 0.9; }
          80% { clip-path: inset(70% 0 15% 0); opacity: 0.7; }
          90% { clip-path: inset(15% 0 60% 0); opacity: 0.8; }
        }

        @keyframes glitch-rgb-2 {
          0%, 100% { clip-path: inset(0 0 0 0); opacity: 0.7; }
          10% { clip-path: inset(30% 0 10% 0); opacity: 0.8; }
          20% { clip-path: inset(50% 0 20% 0); opacity: 0.6; }
          30% { clip-path: inset(10% 0 60% 0); opacity: 0.9; }
          40% { clip-path: inset(70% 0 5% 0); opacity: 0.7; }
          50% { clip-path: inset(40% 0 30% 0); opacity: 0.8; }
          60% { clip-path: inset(80% 0 10% 0); opacity: 0.6; }
          70% { clip-path: inset(20% 0 50% 0); opacity: 0.9; }
          80% { clip-path: inset(60% 0 15% 0); opacity: 0.7; }
          90% { clip-path: inset(45% 0 40% 0); opacity: 0.8; }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.95; }
          50% { opacity: 1; }
          75% { opacity: 0.9; }
        }

        .glitch-hyperrealistic {
          animation: flicker 0.15s infinite steps(1);
        }
      `}</style>
    </div>
  );
}

