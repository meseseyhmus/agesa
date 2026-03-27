import { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Coffee, 
  Smartphone, 
  ShoppingBag, 
  Car,
  Gamepad2,
  CheckCircle,
  XCircle,
  Sparkles
} from 'lucide-react';

// Attention Hunter Game
interface Distraction {
  id: string;
  icon: React.ReactNode;
  name: string;
  type: 'good' | 'bad';
}

const distractions: Distraction[] = [
  { id: '1', icon: <Coffee className="w-8 h-8" />, name: 'Kahve', type: 'bad' },
  { id: '2', icon: <Smartphone className="w-8 h-8" />, name: 'Telefon', type: 'bad' },
  { id: '3', icon: <ShoppingBag className="w-8 h-8" />, name: 'Alışveriş', type: 'bad' },
  { id: '4', icon: <Car className="w-8 h-8" />, name: 'Yeni Araba', type: 'bad' },
  { id: '5', icon: <span className="text-3xl">📚</span>, name: 'Kitap', type: 'good' },
  { id: '6', icon: <span className="text-3xl">💰</span>, name: 'Birikim', type: 'good' },
];

// Decision Jump Game
interface DecisionItem {
  id: string;
  text: string;
  type: 'good' | 'bad';
  emoji: string;
}

const decisionItems: DecisionItem[] = [
  { id: '1', text: '%50 İndirimli Ayakkabı', type: 'bad', emoji: '👟' },
  { id: '2', text: 'Hisse Senedi Al', type: 'good', emoji: '📈' },
  { id: '3', text: 'Yeni iPhone', type: 'bad', emoji: '📱' },
  { id: '4', text: 'Acil Durum Fonu', type: 'good', emoji: '🏦' },
  { id: '5', text: 'Lüks Tatil', type: 'bad', emoji: '🏖️' },
  { id: '6', text: 'Online Kurs', type: 'good', emoji: '🎓' },
  { id: '7', text: 'Gereksiz Abonelik', type: 'bad', emoji: '🔄' },
  { id: '8', text: 'Bütçe Planı', type: 'good', emoji: '📊' },
];

export function MiniGamesPage() {
  const { setCurrentView, addXP, addCoins, unlockBadge } = useGame();
  const [selectedGame, setSelectedGame] = useState<'attention' | 'decision' | null>(null);

  // Attention Hunter State
  const [attentionScore, setAttentionScore] = useState(0);
  const [attentionTimeLeft, setAttentionTimeLeft] = useState(30);
  const [activeDistractions, setActiveDistractions] = useState<string[]>([]);
  const [attentionGameOver, setAttentionGameOver] = useState(false);

  // Decision Jump State
  const [currentItem, setCurrentItem] = useState(0);
  const [decisionScore, setDecisionScore] = useState(0);
  const [decisionResults, setDecisionResults] = useState<boolean[]>([]);
  const [decisionGameOver, setDecisionGameOver] = useState(false);

  // Attention Hunter Game
  useEffect(() => {
    if (selectedGame === 'attention' && attentionTimeLeft > 0 && !attentionGameOver) {
      const timer = setInterval(() => {
        setAttentionTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (attentionTimeLeft === 0) {
      setAttentionGameOver(true);
    }
  }, [selectedGame, attentionTimeLeft, attentionGameOver]);

  useEffect(() => {
    if (selectedGame === 'attention' && !attentionGameOver) {
      const spawner = setInterval(() => {
        const randomDistraction = distractions[Math.floor(Math.random() * distractions.length)];
        setActiveDistractions(prev => {
          if (prev.length >= 5) return prev;
          return [...prev, randomDistraction.id];
        });
        
        setTimeout(() => {
          setActiveDistractions(prev => prev.filter(id => id !== randomDistraction.id));
        }, 3000);
      }, 1500);
      return () => clearInterval(spawner);
    }
  }, [selectedGame, attentionGameOver]);

  const handleDistractionClick = (distraction: Distraction) => {
    if (distraction.type === 'bad') {
      setAttentionScore(prev => prev + 10);
    } else {
      setAttentionScore(prev => Math.max(0, prev - 5));
    }
    setActiveDistractions(prev => prev.filter(id => id !== distraction.id));
  };

  // Decision Jump Game
  const handleDecision = (decision: 'left' | 'right') => {
    const item = decisionItems[currentItem];
    const isCorrect = (decision === 'left' && item.type === 'bad') || 
                      (decision === 'right' && item.type === 'good');
    
    setDecisionResults(prev => [...prev, isCorrect]);
    if (isCorrect) {
      setDecisionScore(prev => prev + 1);
    }

    if (currentItem < decisionItems.length - 1) {
      setCurrentItem(prev => prev + 1);
    } else {
      setDecisionGameOver(true);
      if (decisionScore >= 5) {
        unlockBadge('impulse-resistance');
      }
    }
  };

  const handleFinishGame = () => {
    const totalScore = (selectedGame === 'attention' ? attentionScore : decisionScore * 10);
    addXP(totalScore);
    addCoins(Math.floor(totalScore / 2));
    setCurrentView('profile');
  };

  if (selectedGame === 'attention') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setSelectedGame(null)} className="text-white">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri
            </Button>
            <h1 className="text-2xl font-bold text-white">Dikkat Avcısı</h1>
            <div className="text-white">
              Skor: <span className="text-yellow-400 font-bold">{attentionScore}</span>
            </div>
          </div>

          {!attentionGameOver ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-white mb-2">
                  <span>Kalan Süre</span>
                  <span>{attentionTimeLeft}s</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-red-500"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(attentionTimeLeft / 30) * 100}%` }}
                  />
                </div>
              </div>

              <Card className="bg-white/10 backdrop-blur border-white/20 h-[500px] relative overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Coffee className="w-32 h-32 text-white/10" />
                  </div>
                  
                  <AnimatePresence>
                    {activeDistractions.map((distId) => {
                      const distraction = distractions.find(d => d.id === distId);
                      if (!distraction) return null;
                      
                      const randomX = Math.random() * 80 + 10;
                      const randomY = Math.random() * 70 + 15;
                      
                      return (
                        <motion.button
                          key={distId}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          onClick={() => handleDistractionClick(distraction)}
                          style={{ left: `${randomX}%`, top: `${randomY}%` }}
                          className={`absolute p-4 rounded-full shadow-lg transition-transform hover:scale-110 ${
                            distraction.type === 'bad' 
                              ? 'bg-red-500/80 text-white' 
                              : 'bg-green-500/80 text-white'
                          }`}
                        >
                          {distraction.icon}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </CardContent>
              </Card>

              <div className="mt-4 text-center text-gray-300">
                <p>Kötü dikkat dağıtıcılara (🔴) tıkla, iyilerden (🟢) kaçın!</p>
              </div>
            </>
          ) : (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Oyun Bitti!</h2>
                <p className="text-5xl font-bold text-yellow-400 mb-4">{attentionScore}</p>
                <p className="text-gray-300 mb-6">Toplam Skor</p>
                <Button 
                  size="lg" 
                  onClick={handleFinishGame}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ödülleri Al
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (selectedGame === 'decision') {
    const currentDecisionItem = decisionItems[currentItem];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setSelectedGame(null)} className="text-white">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri
            </Button>
            <h1 className="text-2xl font-bold text-white">Karar Ver!</h1>
            <div className="text-white">
              {currentItem + 1} / {decisionItems.length}
            </div>
          </div>

          {!decisionGameOver ? (
            <>
              <div className="mb-6">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentItem + 1) / decisionItems.length) * 100}%` }}
                  />
                </div>
              </div>

              <Card className="bg-white/10 backdrop-blur border-white/20 mb-6">
                <CardContent className="p-8 text-center">
                  <div className="text-8xl mb-4">{currentDecisionItem.emoji}</div>
                  <h2 className="text-2xl font-bold text-white">{currentDecisionItem.text}</h2>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDecision('left')}
                  className="p-6 rounded-xl bg-red-500/20 border-2 border-red-500 hover:bg-red-500/30 transition-all"
                >
                  <XCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                  <span className="text-white font-bold">Reddet (Sol)</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDecision('right')}
                  className="p-6 rounded-xl bg-green-500/20 border-2 border-green-500 hover:bg-green-500/30 transition-all"
                >
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <span className="text-white font-bold">Kabul Et (Sağ)</span>
                </motion.button>
              </div>

              <div className="mt-6 text-center text-gray-300">
                <p>Kötü harcamayı reddet (sol), iyiyi kabul et (sağ)</p>
              </div>
            </>
          ) : (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Oyun Bitti!</h2>
                <p className="text-5xl font-bold text-green-400 mb-2">{decisionScore}</p>
                <p className="text-gray-300 mb-4">/ {decisionItems.length} Doğru</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {decisionResults.map((result, idx) => (
                    <div 
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        result ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {result ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  onClick={handleFinishGame}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ödülleri Al
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setCurrentView('profile')} className="text-white">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Profile Dön
          </Button>
          <h1 className="text-3xl font-bold text-white">Mini Oyunlar</h1>
          <div className="w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-white/10 backdrop-blur border-white/20 cursor-pointer h-full"
              onClick={() => setSelectedGame('attention')}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <Coffee className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Dikkat Avcısı</h2>
                  <p className="text-gray-300 mb-4">
                    Kafede otururken etrafındaki dikkat dağıtıcılara karşı mücadele et!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <Gamepad2 className="w-5 h-5" />
                    <span>Oyna</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-white/10 backdrop-blur border-white/20 cursor-pointer h-full"
              onClick={() => setSelectedGame('decision')}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <ArrowLeft className="w-8 h-8 text-red-400" />
                    <ArrowRight className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Karar Ver!</h2>
                  <p className="text-gray-300 mb-4">
                    Hızla gelen fırsatları değerlendir. Kötüyü reddet, iyiyi kabul et!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <Gamepad2 className="w-5 h-5" />
                    <span>Oyna</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
