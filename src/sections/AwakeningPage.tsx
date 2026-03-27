import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { TerminalText } from '@/components/TerminalText';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';

export function AwakeningPage() {
  const { user, setCurrentView } = useGame();
  const [stage, setStage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const stages = [
    {
      text: "Kırmızı hapı aldın...",
      subtext: "",
      effect: "glitch",
    },
    {
      text: "Aynaya bak...",
      subtext: "Kim olduğunu gör...",
      effect: "mirror",
    },
    {
      text: `Sen ${user.name || 'Neo'} değilsin...`,
      subtext: "Sen bir borç kölesisin...",
      effect: "shock",
    },
    {
      text: "Kredi kartların...",
      subtext: "Tüketim alışkanlıkların...",
      effect: "list",
    },
    {
      text: "Hepsi seni burada tutuyor...",
      subtext: "Bu finansal Matrix'te...",
      effect: "matrix",
    },
    {
      text: "Ama artık uyanıyorsun...",
      subtext: "Gerçeği görmeye başlıyorsun...",
      effect: "awaken",
    },
    {
      text: "Hoş geldin, gerçek dünyaya...",
      subtext: "Finansal özgürlük yolculuğun başlıyor...",
      effect: "welcome",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < stages.length - 1) {
        setStage(prev => prev + 1);
      } else {
        setShowButton(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [stage]);

  const handleContinue = () => {
    setCurrentView('quiz');
  };

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden flex items-center justify-center">
      {/* Glitch Background Effect */}
      <AnimatePresence>
        {stages[stage].effect === 'glitch' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00FF41] font-mono text-xs"
            style={{ left: `${i * 3.5}%` }}
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2,
            }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <div key={j} style={{ opacity: Math.random() }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
          >
            <MatrixCard className="p-8 md:p-16 text-center" glowColor={stage >= 5 ? 'green' : 'red'}>
              {/* Stage Icon */}
              <motion.div
                animate={{ 
                  rotate: stages[stage].effect === 'glitch' ? [0, 5, -5, 0] : 0,
                  scale: stages[stage].effect === 'awaken' ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.5 }}
                className="text-8xl mb-8"
              >
                {stage === 0 && '💊'}
                {stage === 1 && '🪞'}
                {stage === 2 && '😰'}
                {stage === 3 && '💳'}
                {stage === 4 && '⛓️'}
                {stage === 5 && '👁️'}
                {stage === 6 && '🌅'}
              </motion.div>

              {/* Main Text */}
              <div className="text-3xl md:text-5xl font-bold mb-4">
                {stages[stage].effect === 'glitch' ? (
                  <motion.span
                    animate={{ 
                      x: [-2, 2, -2, 0],
                      color: ['#FF0000', '#00FF41', '#FF0000', '#00FF41']
                    }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    {stages[stage].text}
                  </motion.span>
                ) : (
                  <span className={stage >= 5 ? 'text-[#00FF41] matrix-glow' : 'text-[#FF0000] matrix-glow-red'}>
                    <TerminalText text={stages[stage].text} speed={80} />
                  </span>
                )}
              </div>

              {/* Subtext */}
              {stages[stage].subtext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xl md:text-2xl text-gray-400"
                >
                  <TerminalText text={stages[stage].subtext} speed={60} />
                </motion.div>
              )}

              {/* Progress */}
              <div className="mt-12 flex justify-center gap-2">
                {stages.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-1 w-8 rounded ${
                      i <= stage ? 'bg-[#00FF41]' : 'bg-[#004400]'
                    }`}
                    initial={i === stage ? { scaleX: 0 } : {}}
                    animate={i === stage ? { scaleX: 1 } : {}}
                    transition={{ duration: 2 }}
                  />
                ))}
              </div>
            </MatrixCard>
          </motion.div>
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                size="lg"
                onClick={handleContinue}
                className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 py-6 text-xl font-bold rounded-none border-2 border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.5)]"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  → GERÇEK DÜNYAYA ADIM AT
                </motion.span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#00FF41] opacity-50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#00FF41] opacity-50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#00FF41] opacity-50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00FF41] opacity-50" />
    </div>
  );
}
