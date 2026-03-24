"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalQuest() {
  const [input, setInput] = useState("");
  const [level, setLevel] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const [history, setHistory] = useState([
    { text: ">>> TERMINAL BOOT: MARCH 24, 2026", type: "sys" },
    { text: ">>> STATUS: CONNECTION UNSTABLE. DATA FRAGMENTED.", type: "sys" },
    { text: ">>> IDENTITY VERIFICATION REQUIRED TO PREVENT SYSTEM CRASH.", type: "sys" },
    { text: "------------------------------------------------------------", type: "sys" },
    { text: "LEVEL 1: 'The One Who Must Not Be Named' detected.", type: "prompt" },
    { text: "ENTER THE CODE-NAME (Other than Kaleshi):", type: "prompt" }
  ]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();

  const handleCommand = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const userIn = input.trim();
      const normIn = normalize(userIn);
      const newHistory = [...history, { text: `> ${userIn}`, type: "user" }];

      if (level === 1) {
        if (normIn === "zumzum") {
          newHistory.push({ text: ">>> IDENTITY PARTIALLY VERIFIED. LOADING SECTOR 2...", type: "success" });
          newHistory.push({ text: "LEVEL 2: Archive Locked. Enter the title of the movie we watched:", type: "prompt" });
          setLevel(2);
        } else {
          newHistory.push({ text: ">>> ACCESS DENIED. WRONG FREQUENCY. TRY AGAIN.", type: "error" });
        }
      } 
      else if (level === 2) {
        if (normIn === "vivah") {
          newHistory.push({ text: ">>> CINEMATIC RECORD RECOVERED. FINAL LAYER DETECTED.", type: "success" });
          newHistory.push({ text: "LEVEL 3: Language Pack 'English' corrupted. Replaced with 'Item'.", type: "prompt" });
          newHistory.push({ text: "ENTER THE 1ST CHICHI GIVEN & RECEIVED:", type: "prompt" });
          setLevel(3);
        } else {
          newHistory.push({ text: ">>> INVALID TITLE. MEMORY NOT FOUND.", type: "error" });
        }
      }
      else if (level === 3) {
        if (normIn === "slanty") {
          newHistory.push({ text: ">>> CRITICAL SUCCESS. ALL LAYERS DECRYPTED.", type: "success" });
          newHistory.push({ text: ">>> SYSTEM RECOVERY INITIATED... STANDBY...", type: "sys" });
          setTimeout(() => setIsUnlocked(true), 2000);
        } else {
          newHistory.push({ text: ">>> CHICHI VERIFICATION FAILED. RE-ENTER ITEM KEY.", type: "error" });
        }
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <main 
      className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-12 relative overflow-x-hidden selection:bg-[#00ff41] selection:text-black cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="fixed inset-0 pointer-events-none z-50 bg-size-[100%_2px,3px_100%] opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))' }} />
      
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="terminal"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-3 relative z-10"
          >
            {history.map((line, i) => (
              <div key={i} className={`leading-relaxed break-all ${
                line.type === "error" ? "text-red-500" : 
                line.type === "success" ? "text-cyan-400" : 
                line.type === "sys" ? "opacity-50 text-[10px] uppercase tracking-widest" : "text-[#00ff41]"
              }`}>
                {line.text}
              </div>
            ))}

            <div className="flex gap-3 items-center">
              <span className="animate-pulse shadow-[0_0_8px_#00ff41]">{">"}</span>
              <input 
                ref={inputRef}
                autoFocus
                className="bg-transparent border-none outline-none flex-1 text-[#00ff41] caret-transparent"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoComplete="off"
              />
            </div>
            <div ref={scrollRef} className="h-20" />
          </motion.div>
        ) : (
          <motion.div 
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 overflow-y-auto bg-[#050505] p-6 md:p-12 z-100"
          >
            <div className="max-w-2xl mx-auto space-y-12 py-20">
              
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border-b border-[#00ff41]/30 pb-6 flex justify-between items-end"
              >
                <div>
                  <h2 className="text-[#00ff41] text-[10px] tracking-[0.5em] uppercase mb-2">Security Clearance: Level 20</h2>
                  <h1 className="text-white text-3xl font-serif italic uppercase tracking-tighter">The Decrypted Dossier</h1>
                </div>
                <div className="hidden md:block text-[#00ff41]/40 text-[9px] uppercase tracking-widest text-right">
                  Subject ID: ZUM-01<br/>
                  Status: Verified
                </div>
              </motion.div>

              <div className="space-y-4 font-mono text-[11px] text-[#00ff41]/50">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>[2006] Initial Connection Established...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>[2012] System Stability Tested (The Blue Umbrella Incident)...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>[2024] Data Corruption Detected / Manual Repair Initiated...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="text-cyan-400 font-bold">[2026] Connection Fully Restored. No further encryption required.</motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="bg-[#0A0A0A] border border-[#00ff41]/10 p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(0,255,65,0.05)]"
              >
                <div className="space-y-6">
                  <p className="text-[#F9F7F2] text-lg md:text-xl font-serif italic leading-relaxed text-center">
                    {"Through the glitches and the crashes, you’ve been the one constant."}
                  </p>
                  <p className="text-[#F9F7F2]/80 text-lg md:text-xl font-serif italic leading-relaxed text-center">
                    {"I know I failed at being considerate lately, but I can't change the past, you're hurt I know but let's move forward please me guzra change nhi kar sakta per me khud ko change kar sakta hoon or kia bhi ha bhool jao please or wapis aa jao. You’re not just a 'Zumzum'; you’re the anchor. Delete the past and let's get back together."}
                  </p>
                </div>
                
                <div className="mt-12 flex justify-center">
                  <div className="h-px w-20 bg-linear-to-r from-transparent via-[#00ff41]/50 to-transparent" />
                </div>
                
                <p className="mt-8 text-center text-[#00ff41] text-[9px] uppercase tracking-[0.8em] animate-pulse">
                  End of File • Stay Strong
                </p>
              </motion.div>

              <button 
                onClick={() => window.location.reload()}
                className="block mx-auto mt-12 text-[8px] text-gray-700 hover:text-[#00ff41] transition-colors uppercase tracking-widest"
              >
                [ Relock System ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}