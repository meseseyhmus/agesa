import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { level3Challenges } from '@/data/learningContent';
import { Button } from '@/components/ui/button';
import { MatrixCard } from '@/components/MatrixCard';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Trophy, 
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  Crown,
  CheckCircle
} from 'lucide-react';

export function Level3Page() {
  const { user, addXP, addCoins, unlockBadge, getAvatarState, setCurrentView } = useGame();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [showAvatar, setShowAvatar] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const avatar = getAvatarState();
  const challenge = level3Challenges[currentChallenge];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowResult(true);
  };

  const handleNextChallenge = () => {
    if (currentChallenge < level3Challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setCompletedChallenges(prev => prev + 1);
      addXP(50);
      addCoins(25);
    } else {
      setCompletedChallenges(prev => prev + 1);
      setShowAvatar(true);
      unlockBadge('level-3-master');
      addXP(200);
      addCoins(100);
    }
  };

  const handleGoToProfile = () => {
    setCurrentView('profile');
  };

  if (showAvatar) {
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4 flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 1 }}
          >
            <div className="mb-8">
              <Crown className="w-20 h-20 text-[#00FF41] mx-auto mb-4 matrix-glow" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#00FF41] matrix-glow mb-4">
                TEBRİKLER, FİNANSAL USTA!
              </h1>
              <p className="text-xl text-gray-400">
                Matrix&apos;in dışındaki gerçeği artık tamamen kavradın.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MatrixCard className="p-8 mb-8" glowColor="green">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#004400] to-[#001100] rounded-full border-2 border-[#00FF41]">
                  <span className="text-6xl">
                    {avatar.stage === 1 && '😔'}
                    {avatar.stage === 2 && '😐'}
                    {avatar.stage === 3 && '🙂'}
                    {avatar.stage === 4 && '😎'}
                    {avatar.stage === 5 && '🦸'}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#00FF41] mb-4">
                {user.name} - {avatar.posture === 'hero' ? 'FİNANSAL KAHRAMAN' : 'FİNANSAL ÖĞRENCİ'}
              </h2>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#001400] border border-[#00FF41]/30 rounded p-4">
                    <p className="text-[#00FF41]/70 text-sm mb-1">Toplam XP</p>
                    <p className="text-3xl font-bold text-[#00FF41]">{user.xp}</p>
                  </div>
                  <div className="bg-[#001400] border border-[#00FF41]/30 rounded p-4">
                    <p className="text-[#00FF41]/70 text-sm mb-1">Toplam Coin</p>
                    <p className="text-3xl font-bold text-[#00FF41]">{user.coins}</p>
                  </div>
                  <div className="bg-[#001400] border border-[#00FF41]/30 rounded p-4">
                    <p className="text-[#00FF41]/70 text-sm mb-1">Rozetler</p>
                    <p className="text-3xl font-bold text-[#00FF41]">{user.badges.length}</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {user.badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: Math.random() * 0.5 }}
                      className="bg-[#00FF41]/10 border border-[#00FF41]/30 px-4 py-2 rounded flex items-center gap-2"
                    >
                      <span className="text-xl">{badge.icon}</span>
                      <span className="text-[#00FF41] text-xs font-mono">{badge.name}</span>
                    </motion.div>
                  ))}
                </div>
              </MatrixCard>
            </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button 
              size="lg" 
              onClick={handleGoToProfile}
              className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 py-8 text-xl font-bold rounded-none shadow-[0_0_20px_rgba(0,255,65,0.4)]"
            >
              <Trophy className="w-6 h-6 mr-2" />
              PROFİLİ GÖRÜNTÜLE
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-[#00FF41]/30 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#00FF41] matrix-glow">LEVEL 3: USTALIK</h1>
            <p className="text-gray-500 font-mono">Meydan Okuma {currentChallenge + 1} / {level3Challenges.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#001400] border border-[#00FF41]/30 px-4 py-2 text-[#00FF41] font-mono">
              <span>🪙</span>
              <span className="ml-2">{user.coins}</span>
            </div>
            <div className="bg-[#001400] border border-[#00FF41]/30 px-4 py-2 text-[#00FF41] font-mono">
              <span>⭐</span>
              <span className="ml-2">{user.xp} XP</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Progress 
            value={(completedChallenges / level3Challenges.length) * 100} 
            className="h-2 bg-[#001400]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <MatrixCard className="p-8 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-[#00FF41]" />
                <h2 className="text-2xl font-bold text-white">{challenge.title}</h2>
              </div>
              <p className="text-gray-300 text-xl leading-relaxed">{challenge.description}</p>
            </MatrixCard>

            {challenge.options && challenge.options.length > 0 && (
              <div className="grid gap-4">
                {challenge.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={showResult}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      showResult && selectedOption === option.id
                        ? option.risk === 'high' || option.risk === 'very-high'
                          ? 'bg-red-500/20 border-red-500'
                          : 'bg-green-500/20 border-green-500'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-lg">{option.text}</span>
                      {showResult && selectedOption === option.id && (
                        option.risk === 'high' || option.risk === 'very-high' ? (
                          <TrendingUp className="w-6 h-6 text-red-400" />
                        ) : (
                          <Shield className="w-6 h-6 text-green-400" />
                        )
                      )}
                    </div>
                    {showResult && selectedOption === option.id && (
                      <p className={`mt-2 text-sm ${
                        option.risk === 'high' || option.risk === 'very-high' 
                          ? 'text-red-300' 
                          : 'text-green-300'
                      }`}>
                        {option.risk === 'high' 
                          ? 'Yüksek risk! Tüm paranı kaybedebilirsin.' 
                          : option.risk === 'very-high'
                          ? 'Çok yüksek risk! İş kurmak için daha fazla bilgi gerekli.'
                          : 'Dengeli seçim! Risk ve getiri dengeli.'}
                      </p>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.correctAnswer !== undefined && (
              <MatrixCard className="p-8">
                <div className="flex items-center justify-between mb-4 border-b border-[#00FF41]/30 pb-4">
                  <span className="text-gray-400">DOĞRU CEVAP:</span>
                  <span className="text-3xl font-bold text-[#00FF41] matrix-glow">
                    {challenge.correctAnswer.toLocaleString()} TL
                  </span>
                </div>
                {challenge.explanation && (
                  <p className="text-gray-300 italic mb-6 leading-relaxed">&quot;{challenge.explanation}&quot;</p>
                )}
                <Button 
                  onClick={handleNextChallenge}
                  className="w-full bg-[#00FF41] text-black hover:bg-[#00CC33] py-6 text-lg font-bold"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ANLADIM
                </Button>
              </MatrixCard>
            )}

            {showResult && challenge.options && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <Button 
                  size="lg" 
                  onClick={handleNextChallenge}
                  className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 py-6 text-xl font-bold rounded-none shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  SONRAKİ ADIM
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
