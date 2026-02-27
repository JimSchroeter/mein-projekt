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

// Interface für Bugs
interface Bug {
  id: number;
  x: number;
  y: number;
  text: string;
  hp: number;
  maxHp: number;
}

// Interface für Game Over Nachrichten
interface GameOverMessage {
  message: string;
  tone: string;
}

export default function Home() {
  const [glitchText, setGlitchText] = useState("> Jermaine S. // System Electronics Engineer");
  const [birthYear] = useState("1989");
  const [location] = useState("Berlin, Germany");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gold, setGold] = useState(12450);
  const [transactions, setTransactions] = useState<GoldTransaction[]>([]);
  const [transactionId, setTransactionId] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Strike Animation States
  const [isStriking, setIsStriking] = useState(false);
  const [strikePosition, setStrikePosition] = useState({ x: 0, y: 0 });
  
  // Game States - TYPING DEFENDER
  const [gameActive, setGameActive] = useState(false);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [gameMessage, setGameMessage] = useState("");
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [showGameOver, setShowGameOver] = useState(false);
  const [playerHP, setPlayerHP] = useState(8923);
  const [playerMana, setPlayerMana] = useState(432);
  const [wave, setWave] = useState(1);
  const [score, setScore] = useState(0);
  const [bugsKilled, setBugsKilled] = useState(0);
  const [maxWave, setMaxWave] = useState(1);
  
  // Level basierend auf Alter (36 Jahre alt)
  const [playerLevel] = useState(36);
  
  // PROGRAMMIER-BEFEHLE für das Spiel (erweiterte Liste)
  const bugWords = [
    // JavaScript/TypeScript
    "CONSOLE", "LOG", "FUNCTION", "RETURN", "IMPORT", "EXPORT", 
    "DEFAULT", "CONST", "LET", "VAR", "IF", "ELSE", "FOR", 
    "WHILE", "SWITCH", "CASE", "BREAK", "CONTINUE", "TRY", 
    "CATCH", "FINALLY", "THROW", "NEW", "CLASS", "EXTENDS",
    "SUPER", "THIS", "TYPEOF", "INSTANCEOF", "DELETE", "AWAIT",
    "ASYNC", "YIELD", "STATIC", "GET", "SET", "ENUM",
    
    // HTML/CSS
    "DIV", "SPAN", "CLASS", "STYLE", "MEDIA", "FLEX", "GRID",
    "MARGIN", "PADDING", "BORDER", "WIDTH", "HEIGHT", "COLOR",
    
    // Allgemeine Befehle
    "COMMIT", "PUSH", "PULL", "MERGE", "BRANCH", "CLONE",
    "INSTALL", "BUILD", "DEPLOY", "DEBUG", "TEST", "START",
    "NPM", "YARN", "PNPM", "NODE", "REACT", "VUE", "ANGULAR",
    
    // System/Network
    "PING", "TRACE", "ROUTE", "CONFIG", "STATUS", "QUERY",
    "SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER",
    "DROP", "JOIN", "WHERE", "ORDER", "GROUP", "HAVING",
    
    // Error-related
    "ERROR", "FATAL", "WARNING", "DEBUG", "INFO", "TRACE",
    "EXCEPTION", "CRASH", "OVERFLOW", "SYNTAX", "RUNTIME",
    "COMPILE", "BUNDLE", "LINT", "FORMAT", "CLEAN", "RESET"
  ];

  // Passiv-aggressive Game Over Nachrichten
  const gameOverMessages: GameOverMessage[] = [
    { message: "Immerhin hast du es bis Wave {wave} geschafft. Die meisten schaffen nicht mal Wave 1.", tone: "mild" },
    { message: "{kills} Bugs getötet? Mein 8-jähriger Neffe schafft mehr. Im Schlaf.", tone: "aggressive" },
    { message: "Wave {wave}... naja, Übung macht den Meister. Bei dir dauert das wohl noch.", tone: "passive" },
    { message: "Immerhin warst du beschäftigt. {kills} tote Bugs sind besser als {kills} lebende Bugs, nehme ich an.", tone: "sarcastic" },
    { message: "Hast du schon mal was von 'Try-Catch' gehört? Dein Gameplay könnte es gebrauchen.", tone: "techie" },
    { message: "Git gud. Nein, wirklich. Das war nicht böse gemeint. Na gut, vielleicht ein bisschen.", tone: "gamer" },
    { message: "Dein Score von {score} ist... bemerkenswert. Und nicht im positiven Sinne.", tone: "sarcastic" },
    { message: "Weißt du was? Ich mag dich. Dein Gameplay ist herrlich chaotisch. Wie ein Tornado im Serverraum.", tone: "chaotic" },
    { message: "Wave {wave}? Hast du gepennt oder war das Absicht? Fragen über Fragen.", tone: "aggressive" },
    { message: "{kills} Bugs. In einer anderen Zeitlinie wären das {kills*10} gewesen. Aber nicht in dieser.", tone: "philosophical" },
    { message: "Deine Tippgeschwindigkeit erinnert mich an eine Schnecke auf Valium. Charming.", tone: "brutal" },
    { message: "Immerhin hast du's versucht. Das ist doch was, oder? ODER?", tone: "desperate" },
    { message: "Pro-Tipp: Die Buchstaben auf der Tastatur sind nicht nur Deko.", tone: "helpful" },
    { message: "Dein Mana-Management ist wie meine Steuererklärung: nicht existent.", tone: "self-deprecating" },
  ];
  
  // Floating particles - MINIMAL
  const floatingParticles = [
    { x: 200, y: 300 },
    { x: 500, y: 200 },
    { x: 700, y: 500 }
  ];

  // Nach dem Mounten setzen
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cursor Tracking
  useEffect(() => {
    if (!isMounted) return;
    
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      button, a, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", mouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.head.removeChild(style);
    };
  }, [isMounted]);

  // Klick Handler
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setStrikePosition({ x: e.clientX, y: e.clientY });
      setIsStriking(true);
      setTimeout(() => setIsStriking(false), 200);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Gold income
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

  // TYPING DEFENDER GAME LOGIC
  useEffect(() => {
    if (!gameActive) return;

    // Langsamerer Bug-Spawn (base 2500ms statt 2000ms)
    const spawnInterval = setInterval(() => {
      const randomWord = bugWords[Math.floor(Math.random() * bugWords.length)];
      const newBug: Bug = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: 5, // Starten weiter oben
        text: randomWord,
        hp: randomWord.length * 8, // Weniger HP
        maxHp: randomWord.length * 8,
      };
      setBugs(prev => [...prev, newBug]);
    }, Math.max(1500, 2500 - (wave * 100)); // Langsamere Steigerung

    // Langsamere Bug-Bewegung
    const moveInterval = setInterval(() => {
      setBugs(prev => 
        prev.map(bug => ({
          ...bug,
          y: bug.y + 0.25, // Halb so schnell
        })).filter(bug => {
          if (bug.y > 85) {
            setPlayerHP(hp => {
              const newHp = Math.max(hp - 30, 0);
              if (newHp <= 0) {
                endGame();
              }
              return newHp;
            });
            setGameMessage(`❌ Bug entkommen! -30 HP`);
            setTimeout(() => setGameMessage(""), 1500);
            return false;
          }
          return true;
        })
      );
    }, 150); // Etwas langsamer

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [gameActive, wave]);

  // Game Over Funktion
  const endGame = () => {
    setGameActive(false);
    setShowGameOver(true);
    
    // Zufällige Game Over Nachricht generieren
    const randomIndex = Math.floor(Math.random() * gameOverMessages.length);
    const template = gameOverMessages[randomIndex].message;
    
    // Platzhalter ersetzen
    let message = template
      .replace('{wave}', wave.toString())
      .replace('{kills}', bugsKilled.toString())
      .replace('{score}', score.toString())
      .replace('{kills*10}', (bugsKilled * 10).toString());
    
    setGameOverMessage(message);
    
    // Highscore updaten
    if (wave > maxWave) {
      setMaxWave(wave);
    }
  };

  // Spiel neustarten
  const restartGame = () => {
    setGameActive(true);
    setBugs([]);
    setWave(1);
    setScore(0);
    setBugsKilled(0);
    setPlayerHP(8923);
    setPlayerMana(432);
    setShowGameOver(false);
    setGameOverMessage("");
    setCurrentInput("");
  };

  // Tipp-Eingabe verarbeiten
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCurrentInput(value);

    // Prüfen ob ein Bug getroffen wurde
    const matchedBugIndex = bugs.findIndex(bug => bug.text === value);
    
    if (matchedBugIndex !== -1) {
      // Bug getroffen!
      const bug = bugs[matchedBugIndex];
      
      // Mana Kosten prüfen
      if (playerMana >= 15) {
        setPlayerMana(prev => prev - 15);
        
        setBugs(prev => prev.filter((_, i) => i !== matchedBugIndex));
        setGold(prev => prev + 50);
        setScore(prev => prev + 100);
        setBugsKilled(prev => prev + 1);
        setGameMessage(`✅ +50 Gold!`);
        
        // Langsamere Wellen-Steigerung (nur bei jedem 3. Kill)
        if (bugsKilled > 0 && bugsKilled % 3 === 0) {
          setWave(prev => prev + 1);
          setGameMessage(`🌟 WAVE ${wave + 1}!`);
        }
      } else {
        setGameMessage("❌ Nicht genug MANA!");
      }
      
      setCurrentInput("");
      setTimeout(() => setGameMessage(""), 1500);
    } else if (value.length > 0) {
      // Falsche Eingabe - sofort leeren mit Timeout für bessere UX
      setTimeout(() => setCurrentInput(""), 10);
      setGameMessage("❌ Falsches Wort!");
      setTimeout(() => setGameMessage(""), 500);
    }
  };

  // Backspace Handler für sofortige Leerung
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setCurrentInput("");
    }
  };

  // Spiel starten/stoppen
  const toggleGame = () => {
    if (!gameActive) {
      if (showGameOver) {
        restartGame();
      } else {
        setGameActive(true);
        setBugs([]);
        setWave(1);
        setScore(0);
        setBugsKilled(0);
        setPlayerHP(8923);
        setPlayerMana(432);
        setGameMessage("🎮 SPIEL GESTARTET! Tippe die Wörter!");
      }
    } else {
      setGameActive(false);
      setGameMessage("⏸️ Spiel pausiert");
    }
    setTimeout(() => setGameMessage(""), 2000);
  };

  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-black font-mono flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-gaming overflow-hidden" style={{ cursor: 'none' }}>
      {/* Strike Animation */}
      <AnimatePresence>
        {isStriking && (
          <motion.div
            className="fixed pointer-events-none z-[60]"
            style={{ left: strikePosition.x - 20, top: strikePosition.y - 20 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="40" height="40" viewBox="0 0 100 100">
              <path
                d="M20 20 L80 80 M80 20 L20 80"
                stroke="#ff0000"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Popup */}
      <AnimatePresence>
        {showGameOver && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-b from-purple-900 to-black border-2 border-red-500 rounded-2xl p-8 max-w-md text-center space-y-6"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <h2 className="text-3xl font-bold text-red-500">GAME OVER</h2>
              
              <div className="space-y-2 text-cyan-300">
                <p className="text-sm">{gameOverMessage}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs bg-black/50 p-4 rounded-lg">
                <div>
                  <span className="text-cyan-500">Wave</span>
                  <div className="text-2xl text-yellow-400">{wave}</div>
                </div>
                <div>
                  <span className="text-cyan-500">Kills</span>
                  <div className="text-2xl text-green-400">{bugsKilled}</div>
                </div>
                <div>
                  <span className="text-cyan-500">Score</span>
                  <div className="text-2xl text-purple-400">{score}</div>
                </div>
                <div>
                  <span className="text-cyan-500">Best Wave</span>
                  <div className="text-2xl text-blue-400">{maxWave}</div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartGame}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg text-white font-bold hover:scale-105 transition-all"
                >
                  🔄 NOCHMAL
                </button>
                <button
                  onClick={() => setShowGameOver(false)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg text-white font-bold hover:scale-105 transition-all"
                >
                  ✖️ SCHLIESSEN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 19,
          top: mousePosition.y - 19,
          position: 'fixed',
          willChange: 'transform',
          transform: 'translateZ(0) rotate(45deg) scale(1.2)',
        }}
      >
        <div className="relative w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 10 L60 40 L55 45 L52 60 L48 60 L45 45 L40 40 L50 10"
              fill="#4a9fb1"
              stroke="#a0f0ff"
              strokeWidth="2"
            />
            <circle cx="50" cy="65" r="8" fill="#2a4a5a" stroke="#8ccbd9" strokeWidth="2" />
            <circle cx="46" cy="62" r="1.5" fill="#ff0000" />
            <circle cx="54" cy="62" r="1.5" fill="#ff0000" />
          </svg>
        </div>
      </div>

      {/* Animated Anime Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070)`,
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
              y: [0, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto px-6 sm:px-16 py-16">
        <div className="w-full bg-black/40 backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              JERMAINE S.
            </h1>
            <div className="flex justify-center gap-2 text-lg text-cyan-300">
              <span className="animate-pulse">⚔️</span>
              <span>LEVEL {playerLevel} SYSTEM ENGINEER</span>
              <span className="animate-pulse">⚔️</span>
            </div>
            <div className="text-xs text-cyan-500/50">
              Geboren: 21.06.1989 in Berlin
            </div>
          </div>

          {/* Character Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3">
              <div className="text-red-500 font-bold text-lg">STR</div>
              <div className="text-2xl text-white">92</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <div className="bg-red-500 h-1 rounded" style={{ width: "92%" }} />
              </div>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3">
              <div className="text-blue-400 font-bold text-lg">INT</div>
              <div className="text-2xl text-white">95</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <div className="bg-blue-500 h-1 rounded" style={{ width: "95%" }} />
              </div>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3">
              <div className="text-green-400 font-bold text-lg">AGI</div>
              <div className="text-2xl text-white">78</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <div className="bg-green-500 h-1 rounded" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-3">
              <div className="text-yellow-400 font-bold text-lg">STM</div>
              <div className="text-2xl text-white">88</div>
              <div className="w-full bg-gray-700 h-1 rounded mt-1">
                <div className="bg-yellow-500 h-1 rounded" style={{ width: "88%" }} />
              </div>
            </div>
          </div>

          {/* Character Bio */}
          <div className="space-y-3 text-cyan-300/80 border-l-4 border-cyan-500 pl-4 bg-black/30 p-4 rounded-r-lg">
            <p className="flex items-center gap-2">
              <span className="text-yellow-400">🏰</span> Location: {location}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-400">⚙️</span> Class: IT System Electronics Engineer
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-400">🖥️</span> Specializations: 
              <span> Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">📅</span> Born: 21.06.1989 (Level {playerLevel})
            </p>
          </div>

          {/* GitHub Quest */}
          <a
            href="https://github.com/JimSchroeter"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
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
          </a>

          {/* TYPING DEFENDER MINIGAME */}
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-cyan-500/30 rounded-xl p-4">
            {/* HP und Mana direkt über dem Spiel */}
            <div className="flex justify-between items-center mb-4 bg-black/40 p-3 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-red-400 flex items-center gap-1">
                  <span>❤️</span> HP: {playerHP}/8923
                </span>
                <span className="text-blue-400 flex items-center gap-1">
                  <span>⚡</span> MANA: {playerMana}/560
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-cyan-400">WAVE {wave}</span>
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-yellow-400">SCORE {score}</span>
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-green-400">KILLS {bugsKilled}</span>
              </div>
            </div>

            {/* Game Area */}
            <div className="relative h-64 bg-black/60 rounded-lg border border-cyan-500/30 overflow-hidden mb-4">
              {/* Bugs */}
              <AnimatePresence>
                {bugs.map((bug) => (
                  <motion.div
                    key={bug.id}
                    className="absolute px-3 py-1 bg-red-900/80 border border-red-500 rounded-lg text-xs text-white"
                    style={{
                      left: `${bug.x}%`,
                      top: `${bug.y}%`,
                    }}
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <div className="font-bold">{bug.text}</div>
                    <div className="w-full bg-gray-700 h-1 mt-1 rounded">
                      <div 
                        className="bg-red-500 h-1 rounded" 
                        style={{ width: `${(bug.hp / bug.maxHp) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Game Message */}
              {gameMessage && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-2 rounded-lg text-sm z-10">
                  {gameMessage}
                </div>
              )}

              {/* Start/Stop Button */}
              <button
                onClick={toggleGame}
                className="absolute bottom-2 right-2 bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-900/30 transition-all"
              >
                {gameActive ? '⏸️ PAUSE' : showGameOver ? '🔄 NEU STARTEN' : '▶️ START'}
              </button>
            </div>

            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={gameActive ? "Tippe das Wort..." : "Spiel starten..."}
                disabled={!gameActive}
                className="flex-1 bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-2 text-cyan-300 placeholder-cyan-700 focus:outline-none focus:border-cyan-400 uppercase"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-2 text-cyan-300">
                ⚡{playerMana}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-2 text-[10px] text-cyan-500/50 text-center">
              Tippe die Wörter der Bugs um sie zu besiegen! • 15 Mana pro Kill • Backspace leert sofort
            </div>
          </div>

          {/* Main Rig */}
          <div className="space-y-3">
            <h2 className="text-xl text-yellow-400 flex items-center gap-2">
              <span>⚡</span> JERMAINE'S MAIN RIG - CUSTOM BUILD
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* CPU */}
              <div className="bg-black/60 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-500 transition-all">
                <div className="text-yellow-400 font-bold text-xs mb-1">👑 [LEGENDARY]</div>
                <div className="text-white text-sm">Intel Core i7-12700K</div>
                <div className="text-cyan-400 text-xs">4.8GHz (OC)</div>
              </div>

              {/* RAM */}
              <div className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-500 transition-all">
                <div className="text-purple-400 font-bold text-xs mb-1">[EPIC]</div>
                <div className="text-white text-sm">Corsair Vengeance RGB PRO</div>
                <div className="text-purple-300 text-xs">32GB (2x16) DDR4 3600MHz</div>
              </div>

              {/* GPU */}
              <div className="bg-black/60 border border-yellow-500/30 rounded-lg p-3 text-center hover:border-yellow-500 transition-all">
                <div className="text-yellow-400 font-bold text-xs mb-1">👑 [LEGENDARY]</div>
                <div className="text-white text-sm">Gigabyte RTX 3070 Ti</div>
                <div className="text-cyan-400 text-xs">8GB GDDR6X</div>
              </div>

              {/* Mainboard */}
              <div className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all">
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">MSI Pro Z690-A</div>
                <div className="text-blue-300 text-xs">DDR4 • PCIe 5.0</div>
              </div>

              {/* SSD */}
              <div className="bg-black/60 border border-purple-500/30 rounded-lg p-3 text-center hover:border-purple-500 transition-all">
                <div className="text-purple-400 font-bold text-xs mb-1">[EPIC]</div>
                <div className="text-white text-sm">Samsung 980 PRO</div>
                <div className="text-purple-300 text-xs">1TB NVMe PCIe 4.0</div>
              </div>

              {/* PSU */}
              <div className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all">
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">be quiet! Pure Power 11 FM</div>
                <div className="text-blue-300 text-xs">1000W • 80+ Gold</div>
              </div>

              {/* Case */}
              <div className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all">
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">be quiet! Dark Base 900 Pro</div>
                <div className="text-blue-300 text-xs">Full Tower • Soundproof</div>
              </div>

              {/* Monitor */}
              <div className="bg-black/60 border border-blue-500/30 rounded-lg p-3 text-center hover:border-blue-500 transition-all">
                <div className="text-blue-400 font-bold text-xs mb-1">[RARE]</div>
                <div className="text-white text-sm">ASUS MG278Q</div>
                <div className="text-blue-300 text-xs">144Hz • 1ms • 2K WQHD</div>
              </div>

              {/* Webcam */}
              <div className="bg-black/60 border border-gray-500/30 rounded-lg p-3 text-center hover:border-gray-500 transition-all">
                <div className="text-gray-400 font-bold text-xs mb-1">[COMMON]</div>
                <div className="text-white text-sm">Logitech HD Pro C920</div>
                <div className="text-gray-300 text-xs">1080p • Streaming</div>
              </div>
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
                <div key={index} className="bg-black/60 border border-green-500/30 rounded-lg p-3">
                  <div className="text-green-400 text-xs mb-1">{skill.skill}</div>
                  <div className="w-full bg-gray-700 h-1.5 rounded">
                    <div className="bg-green-500 h-1.5 rounded" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">EXPERIENCE</span>
              <span className="text-yellow-400">LVL {playerLevel} ▸ {playerLevel + 1}</span>
            </div>
            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden border border-cyan-500/50">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600" style={{ width: "75%" }} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs text-cyan-500/70 border-t border-cyan-500/30 pt-4 relative">
            <span className="text-red-400">❤️ HP: {playerHP}/8923</span>
            <span className="text-blue-400">⚡ MANA: {playerMana}/560</span>
            <span className="text-yellow-400 font-bold relative">
              GOLD: 🪙 {gold.toLocaleString()}
            </span>
          </div>
        </div>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .font-gaming {
          font-family: 'Press Start 2P', cursive;
        }

        * {
          cursor: none !important;
        }

        input {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
        }

        input:disabled {
          opacity: 0.5;
          cursor: none !important;
        }

        input::placeholder {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}
