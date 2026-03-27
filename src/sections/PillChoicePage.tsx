import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { TerminalText } from '@/components/TerminalText';
import { MatrixCard } from '@/components/MatrixCard';

export function PillChoicePage() {
  const { user, setPillChoice, setCurrentView } = useGame();
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);
  const [showDialogue, setShowDialogue] = useState(true);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogues = [
    `Merhaba ${user.name || 'Neo'}...`,
    "Sana gerçekleri göstermek istiyorum...",
    "Ama önce bir seçim yapmalısın...",
    "Bu finansal sistem bir hapishane...",
    "Borçlar, harcamalar, endişeler...",
    "Hepsi senin zihninde...",
    "Mavi hapı alırsan...",
    "Hikaye biter, uyanırsın...",
    "Kırmızı hapı alırsan...",
    "Harikalar diyarında kalırsın...",
    "Ve gerçeği görürsün...",
    "Seçim senin...",
  ];

  const handlePillSelect = (pill: 'red' | 'blue') => {
    setSelectedPill(pill);
    setPillChoice(pill);
    
    setTimeout(() => {
      if (pill === 'red') {
        setCurrentView('awakening');
      } else {
        // Blue pill - show message and reset
        alert('Mavi hapı seçtin. Hikaye bitti, uyanırsın...\n\nAma gerçek şu ki: Finansal özgürlük senin elinde!\nTekrar dene ve Kırmızı Hapı seç!');
        setSelectedPill(null);
      }
    }, 2000);
  };

  const handleDialogueComplete = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setShowDialogue(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden flex items-center justify-center p-4">
      {/* Matrix Code Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00FF41] font-mono text-sm"
            style={{
              left: `${i * 5}%`,
              top: -50,
            }}
            animate={{
              y: ['0%', '120%'],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 3,
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j} style={{ opacity: 1 - j * 0.03 }}>
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {showDialogue ? (
            <motion.div
              key="dialogue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <MatrixCard className="p-8 md:p-12">
                <div className="mb-8">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(0,255,65,0.3)',
                        '0 0 40px rgba(0,255,65,0.5)',
                        '0 0 20px rgba(0,255,65,0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#004400] to-[#001100] flex items-center justify-center border-2 border-[#00FF41]"
                  >
                    <span className="text-4xl">🕶️</span>
                  </motion.div>
                </div>

                <div className="text-xl md:text-2xl text-[#00FF41] font-mono min-h-[80px]">
                  <TerminalText 
                    text={dialogues[dialogueIndex]} 
                    speed={60}
                    onComplete={handleDialogueComplete}
                    className="matrix-glow"
                  />
                </div>

                <div className="mt-8 flex justify-center gap-2">
                  {dialogues.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i <= dialogueIndex ? 'bg-[#00FF41]' : 'bg-[#004400]'
                      }`}
                    />
                  ))}
                </div>

                {dialogueIndex === dialogues.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowDialogue(false)}
                    className="mt-8 px-6 py-3 bg-[#00FF41] text-black font-bold rounded hover:bg-[#00CC33] transition-colors"
                  >
                    Seçime Git →
                  </motion.button>
                )}
              </MatrixCard>
            </motion.div>
          ) : (
            <motion.div
              key="pills"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#00FF41] matrix-glow mb-12">
                SEÇİM SENİN...
              </h2>

              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                {/* Blue Pill */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePillSelect('blue')}
                  disabled={selectedPill !== null}
                  className={`
                    relative group w-48 h-64 rounded-3xl
                    bg-gradient-to-br from-[#0066FF] to-[#003399]
                    border-4 border-[#0066FF]
                    shadow-[0_0_40px_rgba(0,102,255,0.5)]
                    transition-all duration-500
                    ${selectedPill === 'blue' ? 'scale-110 ring-4 ring-white' : ''}
                    ${selectedPill === 'red' ? 'opacity-30' : ''}
                  `}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      💊
                    </motion.div>
                    <span className="text-xl font-bold">MAVİ HAP</span>
                    <span className="text-sm mt-2 opacity-80">Hikaye biter</span>
                    <span className="text-xs opacity-60">Uyanırsın...</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.button>

                {/* VS */}
                <div className="text-[#00FF41] text-2xl font-bold matrix-glow">
                  VS
                </div>

                {/* Red Pill */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePillSelect('red')}
                  disabled={selectedPill !== null}
                  className={`
                    relative group w-48 h-64 rounded-3xl
                    bg-gradient-to-br from-[#FF0000] to-[#990000]
                    border-4 border-[#FF0000]
                    shadow-[0_0_40px_rgba(255,0,0,0.5)]
                    transition-all duration-500
                    ${selectedPill === 'red' ? 'scale-110 ring-4 ring-white' : ''}
                    ${selectedPill === 'blue' ? 'opacity-30' : ''}
                  `}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      💊
                    </motion.div>
                    <span className="text-xl font-bold">KIRMIZI HAP</span>
                    <span className="text-sm mt-2 opacity-80">Harikalar diyarında</span>
                    <span className="text-xs opacity-60">kalırsın...</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.button>
              </div>

              {selectedPill && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12"
                >
                  <div className={`text-2xl font-bold ${
                    selectedPill === 'red' ? 'text-[#FF0000]' : 'text-[#0066FF]'
                  }`}>
                    {selectedPill === 'red' 
                      ? 'GERÇEĞİ GÖRMEYE HAZIR MISIN?' 
                      : 'UYANMAK MI İSTİYORSUN?'}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
