"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

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
  
  // Strike Animation States
  const [isStriking, setIsStriking] = useState(false);
  const [strikePosition, setStrikePosition] = useState({ x: 0, y: 0 });
  
  // Game States - TYPING DEFENDER
  const [gameActive, setGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverType, setGameOverType] = useState<"mana" | "hp" | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [gameMessage, setGameMessage] = useState("");
  const [playerHP, setPlayerHP] = useState(8923);
  const [playerMana, setPlayerMana] = useState(432);
  const [wave, setWave] = useState(1);
  const [score, setScore] = useState(0);
  const [bugsKilled, setBugsKilled] = useState(0);
  
  // COMBO MECHANIK
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [comboPopup, setComboPopup] = useState({ show: false, text: "", x: 0, y: 0 });
  const [comboText, setComboText] = useState<{ show: boolean; text: string }>({ show: false, text: "" });
  
  // GLIBITS
  const [glibits, setGlibits] = useState(0);
  const [glibitPopup, setGlibitPopup] = useState({ show: false, amount: 0, x: 0, y: 0 });
  
  // Level basierend auf Alter
  const [playerLevel] = useState(36);
  
  // Refs für flüssigen Cursor
  const rafRef = useRef<number>();
  const mousePosRef = useRef({ x: 0, y: 0 });
  
  // Game Over Nachrichten (motivierend-passiv-aggressiv)
  const gameOverMessages: GameOverMessage[] = [
    { message: "Du hast verloren... streng dich mal an! 💪" },
    { message: "Nicht dein Tag, was? Versuchs nochmal!" },
    { message: "Loser! ... aber wir glauben an dich! ✨" },
    { message: "Autsch. Das war hart. Noch eine Runde?" },
    { message: "Immerhin hast du's versucht. So halb. 🔄" },
    { message: "Du kannst das! Wirklich! ... vielleicht." },
    { message: "Game Over. Aber jeder fängt klein an." },
    { message: "Nicht schlecht für einen Anfänger. Probier's nochmal!" },
    { message: "Oops! ... schon wieder vorbei. Nochmal?" },
    { message: "Du wurdest besser... in diesem Spiel. Nicht." }
  ];
  
  // VERDOPPELTE Bug-Wörter
  const bugWords = [
    "BUG", "ERROR", "404", "CRASH", "HACK", "GLITCH", "FIX", "CODE", 
    "NULL", "UNDEFINED", "SYNTAX", "LOOP", "STACK", "HEAP", "BYTE",
    "CONSOLE", "LOG", "FUNCTION", "RETURN", "IMPORT", "EXPORT", 
    "CONST", "LET", "VAR", "IF", "ELSE", "FOR", "WHILE", "BREAK",
    "CONTINUE", "SWITCH", "CASE", "DEFAULT", "TRY", "CATCH", "FINALLY",
    "THROW", "CLASS", "EXTENDS", "SUPER", "CONSTRUCTOR", "TYPEOF",
    "INSTANCEOF", "DELETE", "AWAIT", "ASYNC", "YIELD", "STATIC",
    "GET", "SET", "ENUM", "IMPLEMENTS", "INTERFACE", "PACKAGE",
    "PRIVATE", "PROTECTED", "PUBLIC", "READONLY", "ABSTRACT",
    "ARRAY", "STRING", "NUMBER", "BOOLEAN", "OBJECT", "SYMBOL",
    "PUSH", "POP", "SHIFT", "UNSHIFT", "SPLICE", "SLICE", "CONCAT",
    "JOIN", "INDEXOF", "INCLUDES", "FIND", "FILTER", "MAP", "REDUCE"
  ];
  
  // Floating particles
  const floatingParticles = [
    { x: 200, y: 300 },
    { x: 500, y: 200 },
    { x: 700, y: 500 }
  ];

  // Ice particles
  const iceParticles = [
    { top: "20%", left: "30%" },
    { top: "70%", left: "60%" }
  ];

  // Nach dem Mounten setzen
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // OPTIMIERTES Cursor Tracking - KEINE VERZÖGERUNG MEHR
  useEffect(() => {
    if (!isMounted) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      // Direkt den Ref aktualisieren für minimale Latenz
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // State nur bei Bedarf über RAF aktualisieren (für Rendering)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition(mousePosRef.current);
      });
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

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.head.removeChild(style);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMounted]);

  // Klick Handler für Strike Animation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const swordTipX = mousePosition.x + 15;
      const swordTipY = mousePosition.y - 15;
      setStrikePosition({ x: swordTipX, y: swordTipY });
      setIsStriking(true);
      setTimeout(() => setIsStriking(false), 200);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [mousePosition]);

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

  // Game Over prüfen
  useEffect(() => {
    if (gameActive && !gameWon && !gameOver) {
      // Prüfen auf Mana = 0
      if (playerMana <= 0) {
        const randomIndex = Math.floor(Math.random() * gameOverMessages.length);
        setGameOverMessage(gameOverMessages[randomIndex].message);
        setGameOverType("mana");
        setGameOver(true);
        setGameActive(false);
      }
    }
  }, [playerMana, gameActive, gameWon, gameOver]);

  // TYPING DEFENDER GAME LOGIC - MIT BALANCE-ÄNDERUNGEN
  useEffect(() => {
    if (!gameActive || gameWon || gameOver) return;

    // Maximale Bugs gleichzeitig: 8
    const MAX_BUGS = 8;
    
    // Spawn-Intervall - angepasst für bessere Balance
    const spawnInterval = setInterval(() => {
      setBugs(prev => {
        if (prev.length >= MAX_BUGS) return prev;
        
        const randomWord = bugWords[Math.floor(Math.random() * bugWords.length)];
        const newBug: Bug = {
          id: Date.now() + Math.random(),
          x: Math.random() * 70 + 15,
          y: 5,
          text: randomWord,
          hp: randomWord.length * 8, // Weniger HP für schnellere Kills
          maxHp: randomWord.length * 8,
        };
        return [...prev, newBug];
      });
    }, 2500 / wave); // Langsamerer Spawn

    // Fallgeschwindigkeit - reduziert für bessere Spielbarkeit
    const moveInterval = setInterval(() => {
      setBugs(prev => 
        prev.map(bug => ({
          ...bug,
          y: bug.y + 0.35, // Langsameres Fallen
        })).filter(bug => {
          // Bug erreicht unteren Screen -> Schaden + Combo-Reset
          if (bug.y > 85) {
            setPlayerHP(hp => {
              const newHp = Math.max(hp - 25, 0); // Weniger Schaden
              if (newHp <= 0) {
                setGameOverType("hp");
                setGameOver(true);
                setGameActive(false);
              }
              return newHp;
            });
            setGameMessage(`❌ Bug entkommen! -25 HP`);
            // Combo-Reset bei Schaden
            setCombo(0);
            setComboText({ show: true, text: "COMBO RESET!" });
            setTimeout(() => setComboText({ show: false, text: "" }), 1000);
            setTimeout(() => setGameMessage(""), 1500);
            return false;
          }
          return true;
        })
      );
    }, 150);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [gameActive, gameWon, gameOver, wave]);

  // Combo Popup anzeigen
  const showComboPopup = (comboValue: number, x: number, y: number) => {
    let text = "";
    let color = "text-yellow-400";
    
    if (comboValue >= 10) {
      text = "🔥 COMBO X" + comboValue + "!";
      color = "text-red-500";
    } else if (comboValue >= 5) {
      text = "⚡ COMBO X" + comboValue + "!";
      color = "text-orange-400";
    } else if (comboValue >= 2) {
      text = "✨ COMBO X" + comboValue + "!";
      color = "text-yellow-400";
    }
    
    if (text) {
      setComboPopup({ show: true, text, x, y });
      setTimeout(() => setComboPopup({ show: false, text: "", x: 0, y: 0 }), 1500);
    }
  };

  // Glibit Popup anzeigen
  const showGlibitPopup = (amount: number, x: number, y: number) => {
    setGlibitPopup({ show: true, amount, x, y });
    setTimeout(() => setGlibitPopup({ show: false, amount: 0, x: 0, y: 0 }), 1500);
  };

  // Reset Game Funktion (mit Auto-Start)
  const resetGame = () => {
    setGameActive(false);
    setGameWon(false);
    setGameOver(false);
    setGameOverType(null);
    setBugs([]);
    setWave(1);
    setScore(0);
    setBugsKilled(0);
    setCombo(0);
    setGlibits(0);
    setPlayerHP(8923);
    setPlayerMana(280);
    setCurrentInput("");
    setGameMessage("🔄 GAME RESET");
    
    // Kurz warten und dann automatisch starten
    setTimeout(() => {
      setGameActive(true);
      setGameMessage("🎮 LOS GEHT'S!");
      setTimeout(() => setGameMessage(""), 2000);
    }, 500);
  };

  // Tipp-Eingabe verarbeiten - FIXED (kein Reset während Eingabe)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCurrentInput(value);

    // Prüfen ob ein Bug getroffen wurde
    const matchedBugIndex = bugs.findIndex(bug => bug.text === value);
    
    if (matchedBugIndex !== -1) {
      const bug = bugs[matchedBugIndex];
      
      if (playerMana >= 15) {
        // Combo erhöhen (nur bei erfolgreichem Kill)
        const newCombo = combo + 1;
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);
        
        // Combat-Text für Combo
        setComboText({ show: true, text: `COMBO x${newCombo}!` });
        setTimeout(() => setComboText({ show: false, text: "" }), 1500);
        
        // GLIBITS berechnen: (Combo - 1) Glibits, mindestens 1 bei x2 Combo
        let glibitReward = 0;
        if (newCombo >= 2) {
          glibitReward = newCombo - 1;
          setGlibits(prev => {
            const newGlibits = prev + glibitReward;
            
            // WIN-BEDINGUNG: 100 Glibits erreicht
            if (newGlibits >= 100 && !gameWon) {
              setGameWon(true);
              setGameActive(false);
              setGameMessage("🏆 DU HAST GEWONNEN! 100 GLIBITS! 🏆");
              setTimeout(() => setGameMessage(""), 3000);
            }
            
            return newGlibits;
          });
          showGlibitPopup(glibitReward, bug.x, bug.y);
        }
        
        // Mana-Berechnung: Basis 5 + Combo-Bonus
        const manaBonus = 5 + (newCombo >= 10 ? 30 : newCombo >= 5 ? 20 : newCombo >= 3 ? 10 : 5);
        
        setPlayerMana(prev => prev - 15 + manaBonus);
        setBugs(prev => prev.filter((_, i) => i !== matchedBugIndex));
        setGold(prev => prev + 50 + (newCombo * 5));
        setScore(prev => prev + 100 + (newCombo * 10));
        setBugsKilled(prev => prev + 1);
        
        // Combo Popup anzeigen (nur wenn Combo >1)
        if (newCombo > 1) {
          showComboPopup(newCombo, bug.x, bug.y - 5);
        }
        
        setGameMessage(`✅ +50 Gold!`);
        
        if (Math.random() > 0.7) {
          setWave(prev => prev + 1);
          setGameMessage(`🌟 WAVE ${wave + 1}!`);
        }
        
        setCurrentInput("");
      } else {
        setGameMessage("❌ Nicht genug MANA!");
        // KEIN Combo-Reset bei Mana-Mangel
      }
      
      setTimeout(() => setGameMessage(""), 1500);
    } else if (value.length === 3 || value.length === 4 || value.length === 5) {
      // Nur bei typischen Wortlängen prüfen, ob es ein Fehler sein könnte
      // Aber noch nicht zurücksetzen - warten auf vollständige Eingabe
    }
  };

  // Backspace Handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setCurrentInput("");
    } else if (e.key === 'Enter' && currentInput.length > 0) {
      // Bei Enter prüfen, ob das Wort falsch ist
      const matched = bugs.some(bug => bug.text === currentInput);
      if (!matched && currentInput.length > 0) {
        // Falsche Eingabe bestätigt - Combo zurücksetzen
        setCombo(0);
        setComboText({ show: true, text: "COMBO RESET!" });
        setTimeout(() => setComboText({ show: false, text: "" }), 1000);
        setGameMessage("❌ Falsches Wort!");
        setTimeout(() => setGameMessage(""), 800);
        setCurrentInput("");
      }
    }
  };

  // Spiel starten/stoppen
  const toggleGame = () => {
    if (!gameActive && !gameWon && !gameOver) {
      setGameActive(true);
      setBugs([]);
      setWave(1);
      setScore(0);
      setBugsKilled(0);
      setCombo(0);
      setGameMessage("🎮 SPIEL GESTARTET! Tippe die Wörter!");
    } else if (gameActive) {
      setGameActive(false);
      setGameMessage("⏸️ Spiel pausiert");
    }
    setTimeout(() => setGameMessage(""), 2000);
  };

  // Cursor Variants - OPTIMIERT (weniger spring physics)
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      rotate: 45,
      scale: 1.2,
      transition: { type: "just", stiffness: 0 } // Minimale Verzögerung
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      rotate: 45,
      scale: 1.4,
      transition: { type: "just", stiffness: 0 }
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
    <div className="relative min-h-screen font-gaming overflow-hidden" style={{ cursor: 'none' }}>
      {/* Combat Text am unteren Bildschirmrand */}
      <AnimatePresence>
        {comboText.show && (
          <motion.div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[90] text-2xl font-bold whitespace-nowrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.7)]">
              {comboText.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Popup - Mana Version */}
      <AnimatePresence>
        {gameOver && gameOverType === "mana" && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
              <div className="w-20 h-20 mx-auto bg-purple-800/50 rounded-full flex items-center justify-center">
                <span className="text-4xl">😵</span>
              </div>
              <div className="text-cyan-300 text-lg">MANA LEER!</div>
              <div className="text-cyan-400/80 text-sm">{gameOverMessage}</div>
              
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg text-white font-bold hover:scale-105 transition-all"
              >
                🔄 NOCHMAL VERSUCHEN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Popup - HP Version (Grabstein mit Gras, Erde und Blume) */}
      <AnimatePresence>
        {gameOver && gameOverType === "hp" && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-b from-green-900/50 to-black border-2 border-gray-600 rounded-2xl p-8 max-w-md text-center space-y-6 relative overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {/* Gras am unteren Rand */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-800 to-green-600">
                <div className="absolute top-0 left-4 w-3 h-4 bg-green-700 rounded-t-lg transform -rotate-6"></div>
                <div className="absolute top-0 left-10 w-3 h-5 bg-green-700 rounded-t-lg transform rotate-3"></div>
                <div className="absolute top-0 left-20 w-3 h-6 bg-green-700 rounded-t-lg transform -rotate-12"></div>
                <div className="absolute top-0 right-4 w-3 h-4 bg-green-700 rounded-t-lg transform rotate-12"></div>
                <div className="absolute top-0 right-12 w-3 h-5 bg-green-700 rounded-t-lg transform -rotate-3"></div>
              </div>
              
              {/* Erde */}
              <div className="absolute bottom-12 left-0 right-0 h-4 bg-gradient-to-b from-brown-700 to-brown-900"></div>
              
              <h2 className="text-3xl font-bold text-gray-400 relative z-10">R.I.P.</h2>
              
              {/* Grabstein (ohne Kreuz) */}
              <div className="relative w-28 h-36 mx-auto z-10">
                {/* Grabstein Basis */}
                <div className="absolute bottom-0 w-28 h-24 bg-gray-700 rounded-t-lg border-2 border-gray-500"></div>
                <div className="absolute bottom-24 w-24 h-10 bg-gray-600 rounded-t-lg left-2 border-2 border-gray-500"></div>
                <div className="absolute bottom-20 w-20 h-20 bg-gray-500 rounded-t-lg left-4 border-2 border-gray-400 flex items-center justify-center">
                  {/* Eingemeißelter "LOSER" Schriftzug */}
                  <span className="text-red-600 font-bold text-xl transform -rotate-90 opacity-80" 
                        style={{ textShadow: '2px 2px 0 #333, -1px -1px 0 #999' }}>
                    LOSER
                  </span>
                </div>
                
                {/* Blume die aus dem Gras wächst */}
                <div className="absolute -bottom-2 left-12 z-20">
                  {/* Stiel */}
                  <div className="w-1 h-10 bg-green-600 mx-auto"></div>
                  {/* Blüte */}
                  <div className="relative -top-10">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full absolute -left-2 top-0"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full absolute left-2 top-0"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full absolute left-0 -top-2"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full absolute left-0 top-2"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full absolute left-0 top-0 z-10"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-red-400 text-lg relative z-10">DU BIST GESTORBEN!</div>
              <div className="text-gray-400 text-sm relative z-10">Immerhin hast du {bugsKilled} Bugs gekillt...</div>
              
              <button
                onClick={resetGame}
                className="relative z-10 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg text-white font-bold hover:scale-105 transition-all"
              >
                🪦 WIEDERBELEBEN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Combo Popup */}
      <AnimatePresence>
        {comboPopup.show && (
          <motion.div
            className="fixed z-[70] text-xl font-bold whitespace-nowrap"
            style={{
              left: `${comboPopup.x}%`,
              top: `${comboPopup.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 2, opacity: 1, y: -50 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <span className={`
              ${comboPopup.text.includes('🔥') ? 'text-red-500' : 
                comboPopup.text.includes('⚡') ? 'text-orange-400' : 
                'text-yellow-400'} font-bold drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]
            `}>
              {comboPopup.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glibit Popup */}
      <AnimatePresence>
        {glibitPopup.show && (
          <motion.div
            className="fixed z-[70] flex items-center gap-2"
            style={{
              left: `${glibitPopup.x}%`,
              top: `${glibitPopup.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0, x: 0 }}
            animate={{ scale: 2, opacity: 1, x: 30 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Glitchiger Glibit Cube */}
            <motion.div
              className="w-6 h-6 relative"
              animate={{
                scale: [1, 1.3, 0.7, 1.2, 0.9, 1],
                rotate: [0, 15, -20, 25, -15, 0],
                skewX: [0, 10, -15, 12, -8, 0],
                skewY: [0, 8, -12, 10, -6, 0],
                filter: [
                  'hue-rotate(0deg) brightness(1)',
                  'hue-rotate(90deg) brightness(1.5)',
                  'hue-rotate(180deg) brightness(0.8)',
                  'hue-rotate(270deg) brightness(1.3)',
                  'hue-rotate(360deg) brightness(1)',
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-cyan-400 clip-cube"></div>
              <div className="absolute inset-0 bg-pink-400 clip-cube opacity-70 animate-pulse"></div>
              <div className="absolute inset-0 bg-yellow-400 clip-cube opacity-40" style={{ mixBlendMode: 'screen' }}></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-pink-400 clip-cube blur-md opacity-50"></div>
            </motion.div>
            <span className="text-cyan-300 font-bold text-lg animate-pulse">+{glibitPopup.amount}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strike Animation */}
      <AnimatePresence>
        {isStriking && (
          <motion.div
            key="strike"
            className="fixed pointer-events-none z-[60]"
            style={{ left: strikePosition.x - 15, top: strikePosition.y - 15 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="30" height="30" viewBox="0 0 100 100">
              <path
                d="M20 20 L80 80 M80 20 L20 80"
                stroke="#ffaa00"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
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

      {/* Custom Frostmourne Cursor - MIT OPTIMIERTER PERFORMANCE */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          rotate: 45,
          scale: cursorVariant === "hover" ? 1.4 : 1.2
        }}
        transition={{ type: "tween", duration: 0 }} // KEINE Verzögerung!
      >
        <div className="relative w-10 h-10">
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
        </div>
      </motion.div>

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
        <motion.div
          className="w-full bg-black/40 backdrop-blur-md border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8 space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setCursorVariant("hover")}
          onHoverEnd={() => setCursorVariant("default")}
        >
          {/* SUPER MARIO BROS NAME - VERBESSERT MIT MONSTERNS */}
          <div className="text-center space-y-2">
            <div className="relative inline-block">
              <h1 className="text-5xl sm:text-6xl font-bold relative z-10">
                <span className="mario-name">
                  <span className="mario-block">J</span>
                  <span className="mario-block">E</span>
                  <span className="mario-block">R</span>
                  <span className="mario-block">M</span>
                  <span className="mario-block">A</span>
                  <span className="mario-block">I</span>
                  <span className="mario-block">N</span>
                  <span className="mario-block">E</span>
                  <span className="mario-space"> </span>
                  <span className="mario-block">S</span>
                  <span className="mario-dot">.</span>
                </span>
              </h1>
              
              {/* MARIO HINTERGRUND (Berge/Wolken) */}
              <div className="absolute -top-16 left-0 right-0 h-20 pointer-events-none">
                {/* Berge im Hintergrund */}
                <div className="absolute bottom-0 left-5 w-16 h-12 bg-green-800/30 rounded-t-full transform -rotate-3"></div>
                <div className="absolute bottom-0 left-16 w-20 h-16 bg-green-700/30 rounded-t-full"></div>
                <div className="absolute bottom-0 right-5 w-16 h-12 bg-green-800/30 rounded-t-full transform rotate-3"></div>
                <div className="absolute bottom-0 right-16 w-20 h-16 bg-green-700/30 rounded-t-full"></div>
                
                {/* Wolken */}
                <div className="absolute top-0 left-10 w-12 h-6 bg-white/20 rounded-full"></div>
                <div className="absolute top-2 left-14 w-8 h-5 bg-white/20 rounded-full"></div>
                <div className="absolute top-0 right-10 w-12 h-6 bg-white/20 rounded-full"></div>
                <div className="absolute top-2 right-14 w-8 h-5 bg-white/20 rounded-full"></div>
              </div>
              
              {/* MARIO ENEMIES */}
              {/* Goomba (links oben) */}
              <div className="absolute -top-8 -left-12 w-10 h-10 animate-bounce" style={{ animationDuration: '2s' }}>
                <div className="w-8 h-6 bg-brown-600 rounded-t-lg mx-auto"></div>
                <div className="w-10 h-4 bg-brown-700 rounded-b-lg"></div>
                <div className="flex justify-between px-2 -mt-1">
                  <div className="w-1 h-2 bg-white rounded-full"></div>
                  <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between mt-1">
                  <div className="w-1 h-2 bg-brown-800 rounded-full"></div>
                  <div className="w-1 h-2 bg-brown-800 rounded-full"></div>
                </div>
              </div>
              
              {/* Koopa (rechts oben) */}
              <div className="absolute -top-10 -right-12 w-12 h-10 animate-pulse">
                <div className="w-10 h-5 bg-green-700 rounded-t-lg mx-auto"></div>
                <div className="w-8 h-4 bg-green-600 mx-auto"></div>
                <div className="flex justify-between px-2">
                  <div className="w-1 h-3 bg-yellow-600 rounded-full"></div>
                  <div className="w-1 h-3 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Pilz (rechts unten) */}
              <div className="absolute -bottom-6 -right-8 w-8 h-8 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-6 h-3 bg-red-600 rounded-t-lg mx-auto"></div>
                <div className="w-7 h-4 bg-orange-400 rounded-b-lg mx-auto"></div>
                <div className="w-1 h-2 bg-white absolute top-1 left-3"></div>
              </div>
              
              {/* Stern (links unten) */}
              <div className="absolute -bottom-8 -left-8 w-8 h-8 animate-spin" style={{ animationDuration: '4s' }}>
                <div className="w-6 h-6 bg-yellow-400 rotate-45 transform origin-center"></div>
              </div>
              
              {/* Münzen */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 text-lg text-cyan-300 mt-4">
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
              <span className="hacker-glitch" data-text=" Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage">
                 Cloud Architecture • Zero Trust Security • SD-WAN • Infrastructure as Code • Root Cause Analysis • Packet Triage
              </span>
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
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
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
            <div className="flex justify-between items-center mb-4">
              <span className="text-cyan-300">⌨️ TYPING DEFENDER</span>
              <div className="flex gap-2">
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-cyan-400">WAVE {wave}</span>
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-yellow-400">SCORE {score}</span>
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-green-400">KILLS {bugsKilled}</span>
              </div>
            </div>

            {/* HP, Mana und Combo Anzeigen */}
            <div className="flex justify-between items-center mb-4 bg-black/40 p-2 rounded-lg">
              <div className="flex gap-4">
                <span className="text-red-400 text-sm">❤️ HP: {playerHP}</span>
                <span className="text-blue-400 text-sm">⚡ MANA: {playerMana}</span>
              </div>
              <div className="flex gap-2">
                {combo > 1 && (
                  <span className="text-xs bg-black/50 px-2 py-1 rounded text-orange-400 border border-orange-500/50">
                    COMBO x{combo}
                  </span>
                )}
                {/* BEST COMBO oben links im Spielfenster */}
                {maxCombo > 0 && (
                  <span className="text-xs bg-black/50 px-2 py-1 rounded text-purple-400 border border-purple-500/50">
                    BEST x{maxCombo}
                  </span>
                )}
              </div>
            </div>

            {/* Game Area */}
            <div className="relative h-64 bg-black/60 rounded-lg border border-cyan-500/30 overflow-hidden mb-4">
              {/* GLIBITS Anzeige unten links */}
              <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                <motion.div
                  className="w-5 h-5 relative"
                  animate={{
                    scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
                    rotate: [0, 10, -15, 12, -8, 0],
                    skewX: [0, 5, -8, 6, -4, 0],
                    filter: [
                      'hue-rotate(0deg)',
                      'hue-rotate(45deg)',
                      'hue-rotate(90deg)',
                      'hue-rotate(45deg)',
                      'hue-rotate(0deg)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-cyan-400 clip-cube"></div>
                  <div className="absolute inset-0 bg-pink-400 clip-cube opacity-60 animate-pulse"></div>
                  <div className="absolute inset-0 bg-purple-400 clip-cube opacity-40 mix-blend-screen"></div>
                </motion.div>
                <span className="text-cyan-300 font-bold text-sm">{glibits}</span>
              </div>

              {/* Win Message */}
              {gameWon && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl mb-2"
                    >
                      🏆
                    </motion.div>
                    <div className="text-yellow-400 font-bold text-xl">DU HAST GEWONNEN!</div>
                    <div className="text-cyan-300 text-sm mt-2">100 GLIBITS ERREICHT</div>
                  </div>
                </div>
              )}

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
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
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

              {gameMessage && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-2 rounded-lg text-sm z-10">
                  {gameMessage}
                </div>
              )}

              {/* Game Controls */}
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={resetGame}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="bg-black/50 border border-purple-500/50 rounded-lg px-3 py-2 text-xs text-purple-300 hover:bg-purple-900/30 transition-all"
                >
                  🔄 RESET
                </button>
                <button
                  onClick={toggleGame}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-900/30 transition-all"
                  disabled={gameWon || gameOver}
                >
                  {gameActive ? '⏸️ PAUSE' : gameWon ? '🏆 GEWONNEN' : gameOver ? '💀 GAME OVER' : '▶️ START'}
                </button>
              </div>
            </div>

            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={gameActive ? "Tippe das Wort..." : "Spiel starten..."}
                disabled={!gameActive || gameWon || gameOver}
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
              Tippe die Wörter der Bugs um sie zu besiegen! • Combos geben extra Mana & Glibits • 100 Glibits = Sieg
            </div>
          </div>

          {/* XP BAR */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">EXPERIENCE</span>
              <span className="text-yellow-400">LVL {playerLevel} ▸ {playerLevel + 1}</span>
            </div>
            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden border border-cyan-500/50">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600" style={{ width: "75%" }} />
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

          {/* FOOTER (nur Gold) */}
          <div className="flex justify-center text-xs text-cyan-500/70 border-t border-cyan-500/30 pt-4">
            <span className="text-yellow-400 font-bold">
              GOLD: 🪙 {gold.toLocaleString()}
            </span>
          </div>
        </motion.div>
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
        }

        input::placeholder {
          font-size: 10px;
        }

        /* Cube Clip Path */
        .clip-cube {
          clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
        }

        /* SUPER MARIO BROS NAME */
        .mario-name {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2px;
        }

        .mario-block {
          display: inline-block;
          width: 50px;
          height: 60px;
          background: linear-gradient(135deg, #e67e22 0%, #f1c40f 50%, #e67e22 100%);
          border: 3px solid #8B4513;
          border-radius: 8px 8px 4px 4px;
          box-shadow: 
            0 4px 0 #654321,
            0 6px 0 #3d2b1a,
            inset 0 -2px 0 #f39c12,
            inset 0 2px 0 #f9e79f;
          text-align: center;
          line-height: 60px;
          font-size: 32px;
          font-weight: 900;
          color: #fff;
          text-shadow: 
            3px 3px 0 #c0392b,
            1px 1px 0 #2980b9,
            0 0 10px rgba(241, 196, 15, 0.8);
          margin: 0 2px;
          transform: rotate(1deg);
          animation: block-bounce 2s infinite;
        }

        .mario-block:nth-child(even) {
          transform: rotate(-1deg);
          background: linear-gradient(135deg, #f1c40f 0%, #e67e22 50%, #f1c40f 100%);
          animation: block-bounce 2s infinite 0.2s;
        }

        .mario-block:nth-child(3n) {
          background: linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #27ae60 100%);
          border-color: #1e5f3e;
          animation: block-bounce 2s infinite 0.4s;
        }

        .mario-block:nth-child(5n) {
          background: linear-gradient(135deg, #2980b9 0%, #3498db 50%, #2980b9 100%);
          border-color: #1a5276;
          animation: block-bounce 2s infinite 0.1s;
        }

        .mario-space {
          width: 20px;
        }

        .mario-dot {
          display: inline-block;
          width: 50px;
          height: 60px;
          background: linear-gradient(135deg, #f1c40f 0%, #e67e22 50%, #f1c40f 100%);
          border: 3px solid #8B4513;
          border-radius: 8px 8px 4px 4px;
          box-shadow: 
            0 4px 0 #654321,
            0 6px 0 #3d2b1a,
            inset 0 -2px 0 #f39c12,
            inset 0 2px 0 #f9e79f;
          text-align: center;
          line-height: 60px;
          font-size: 32px;
          font-weight: 900;
          color: #fff;
          margin: 0 2px;
        }

        @keyframes block-bounce {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }

        .mario-block:nth-child(even) {
          animation: block-bounce-even 2s infinite 0.2s;
        }

        @keyframes block-bounce-even {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
        }

        /* HACKER-FILM GLITCH + ZUCKEN */
        .hacker-glitch {
          position: relative;
          display: inline-block;
          color: #00ffff;
          animation: 
            glitch-flicker 3s infinite,
            glitch-twitch 0.5s infinite;
          text-shadow: 
            0 0 5px #ff00ff,
            0 0 2px #00ffff;
        }

        .hacker-glitch::before,
        .hacker-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
          opacity: 0.4;
        }

        .hacker-glitch::before {
          animation: glitch-offset-1 2s infinite;
          color: #ff00ff;
          z-index: -1;
        }

        .hacker-glitch::after {
          animation: glitch-offset-2 2.5s infinite;
          color: #00ffff;
          z-index: -2;
        }

        @keyframes glitch-twitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-1px, 0.5px); }
          20% { transform: translate(1px, -0.5px); }
          30% { transform: translate(-0.5px, 1px); }
          40% { transform: translate(0.5px, -1px); }
          50% { transform: translate(0); }
          60% { transform: translate(0.5px, 0.5px); }
          70% { transform: translate(-0.5px, -0.5px); }
          80% { transform: translate(1px, 0); }
          90% { transform: translate(-1px, 0); }
        }

        @keyframes glitch-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.3; }
          94% { opacity: 1; }
          95% { opacity: 0.5; }
          96% { opacity: 1; }
          97% { opacity: 0.2; }
          98% { opacity: 1; }
        }

        @keyframes glitch-offset-1 {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(2px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, -2px); }
          50% { transform: translate(0); }
          60% { transform: translate(2px, 1px); }
          70% { transform: translate(-2px, -1px); }
          80% { transform: translate(1px, 2px); }
          90% { transform: translate(-1px, -2px); }
        }

        @keyframes glitch-offset-2 {
          0%, 100% { transform: translate(0); }
          15% { transform: translate(2px, -1px); }
          25% { transform: translate(-2px, 1px); }
          35% { transform: translate(1px, -2px); }
          45% { transform: translate(-1px, 2px); }
          55% { transform: translate(0); }
          65% { transform: translate(-2px, -1px); }
          75% { transform: translate(2px, 1px); }
          85% { transform: translate(-1px, -2px); }
          95% { transform: translate(1px, 2px); }
        }
      `}</style>
    </div>
  );
}
