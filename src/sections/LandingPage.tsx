import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Input } from '@/components/ui/input';
import { MatrixCard } from '@/components/MatrixCard';
import { TerminalText } from '@/components/TerminalText';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Gamepad2, 
  TrendingUp, 
  Shield, 
  Sparkles,
  Target,
} from 'lucide-react';

export function LandingPage() {
  const { setUserName, setCurrentView, user } = useGame();
  const [name, setName] = useState(user.name || '');
  const [showIntro, setShowIntro] = useState(false);
  const [terminalComplete, setTerminalComplete] = useState(false);

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name.trim());
      setShowIntro(true);
    }
  };

  const startJourney = () => {
    setCurrentView('pill-choice');
  };

  const terminalText = `> Sistem başlatılıyor...
> Kullanıcı doğrulanıyor...
> Finansal Matrix'e erişim izni verildi...
> Kırmızı Hap protokolü aktif...
> Hazır.`;

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#0D0208] flex items-center justify-center p-4 relative">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0,255,65,0.3)',
                    '0 0 40px rgba(0,255,65,0.5)',
                    '0 0 20px rgba(0,255,65,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#004400] to-[#001100] rounded-full mb-6 border-2 border-[#00FF41]"
              >
                <span className="text-5xl">💊</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-[#00FF41] matrix-glow mb-4">
                MATRIX: FİNANSAL UYANIŞ
              </h1>
              <p className="text-xl text-gray-400">
                Hoş geldin, <span className="text-[#00FF41] font-bold">{name}</span>
              </p>
            </div>

            {/* Terminal Output */}
            <MatrixCard className="p-6 mb-8 font-mono text-sm">
              <TerminalText 
                text={terminalText} 
                speed={30}
                onComplete={() => setTerminalComplete(true)}
                className="text-[#00FF41]"
              />
            </MatrixCard>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <MatrixCard className="p-6 text-center">
                <Brain className="w-12 h-12 text-[#00FF41] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#00FF41] mb-2">ÖĞREN</h3>
                <p className="text-gray-400 text-sm">
                  Davranışsal finans ve bilişsel önyargıları keşfet
                </p>
              </MatrixCard>

              <MatrixCard className="p-6 text-center">
                <Gamepad2 className="w-12 h-12 text-[#00FF41] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#00FF41] mb-2">OYNA</h3>
                <p className="text-gray-400 text-sm">
                  Ajan Smith&apos;e karşı savaş, mini oyunlarla pratik yap
                </p>
              </MatrixCard>

              <MatrixCard className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-[#00FF41] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#00FF41] mb-2">GELİŞ</h3>
                <p className="text-gray-400 text-sm">
                  Emeklilik hesabını büyüt, finansal özgürlüğe ulaş
                </p>
              </MatrixCard>
            </div>

            {/* Journey Steps */}
            <MatrixCard className="p-6 mb-8">
              <h2 className="text-xl font-bold text-[#00FF41] mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                YOLCULUK NASIL İLERLEYECEK?
              </h2>
              <div className="space-y-4">
                {[
                  { num: '1', text: 'Kırmızı Hapı Al', sub: 'Gerçeği görmeye cesaret et' },
                  { num: '2', text: 'Harcama Karakterini Keşfet', sub: 'Quiz ile finansal karakterini öğren' },
                  { num: '3', text: 'Eğitim Kampı', sub: 'AI Mentor Morpheus ile öğren' },
                  { num: '4', text: 'Gerçek Dünya Simülasyonu', sub: 'Senaryolarda pratik yap' },
                  { num: '5', text: 'Ajan Smith ile Savaş', sub: 'Enflasyon ve faizi yen' },
                  { num: '6', text: 'Geleceği Gör', sub: '65 yaşındaki hayatını simüle et' },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-[#00FF41]/20 border border-[#00FF41] flex items-center justify-center text-[#00FF41] font-bold">
                      {step.num}
                    </div>
                    <div>
                      <p className="text-white font-medium">{step.text}</p>
                      <p className="text-gray-500 text-sm">{step.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </MatrixCard>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startJourney}
                disabled={!terminalComplete}
                className={`
                  px-12 py-6 text-xl font-bold rounded-none
                  border-2 border-[#00FF41] bg-[#00FF41] text-black
                  hover:bg-[#00CC33] transition-all
                  shadow-[0_0_30px_rgba(0,255,65,0.5)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  KIRMIZI HAPI AL
                  <Sparkles className="w-5 h-5" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0208] flex items-center justify-center p-4 relative">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(0,255,65,0.3)',
                '0 0 40px rgba(0,255,65,0.5)',
                '0 0 20px rgba(0,255,65,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#004400] to-[#001100] rounded-full mb-8 border-2 border-[#00FF41]"
          >
            <span className="text-6xl">💊</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-[#00FF41] matrix-glow mb-4">
            MATRIX
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 mb-2">
            FİNANSAL UYANIŞ
          </p>
          <p className="text-gray-500 mb-8">
            &quot;Gerçeği öğrenmek ister misin?&quot;
          </p>
        </motion.div>

        <MatrixCard className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[#00FF41] text-lg mb-2 font-mono">
                {'>'} Kullanıcı adı gir:
              </label>
              <Input
                type="text"
                placeholder="Neo..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                className="bg-[#001400] border-[#00FF41] text-[#00FF41] placeholder:text-[#004400] text-lg py-6 text-center font-mono"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={!name.trim()}
              className="w-full py-4 bg-[#00FF41] text-black font-bold text-lg hover:bg-[#00CC33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SİSTEME GİRİŞ YAP
            </motion.button>
          </div>
        </MatrixCard>

        <div className="mt-8 flex justify-center gap-8 text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">%100 Ücretsiz</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            <span className="text-sm">Bilimsel Temelli</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span className="text-sm">BES Entegre</span>
          </div>
        </div>
      </div>
    </div>
  );
}
