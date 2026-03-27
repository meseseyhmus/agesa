import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { level2Scenarios, latteFactorItems } from '@/data/learningContent';
import { Button } from '@/components/ui/button';
import { MatrixCard } from '@/components/MatrixCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Wallet, 
  TrendingDown, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Coffee,
  Sparkles,
  Calculator
} from 'lucide-react';

export function Level2Page() {
  const { user, addXP, addCoins, unlockBadge, setCurrentView } = useGame();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showLatteFactor, setShowLatteFactor] = useState(false);
  const [decisions, setDecisions] = useState<string[]>([]);
  const [budget, setBudget] = useState(15000);
  const [showScenarioResult, setShowScenarioResult] = useState(false);

  const scenario = level2Scenarios[currentScenario];

  const handleDecision = (decision: string, cost: number) => {
    const newBudget = budget + (decision === 'accept' ? -cost : 0);
    setBudget(newBudget);
    setDecisions([...decisions, decision]);
    setShowScenarioResult(true);
  };

  const handleNextScenario = () => {
    if (currentScenario < level2Scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setBudget(15000);
      setShowScenarioResult(false);
    } else {
      setShowLatteFactor(true);
    }
  };

  const handleFinishLevel2 = () => {
    unlockBadge('first-save');
    addXP(100);
    addCoins(50);
    setCurrentView('level3');
  };

  if (showLatteFactor) {
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Coffee className="w-14 h-14 text-amber-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <h1 className="text-3xl font-bold text-[#00FF41] matrix-glow font-mono tracking-widest mb-1">LATTE FAKTÖRÜ</h1>
            <p className="text-gray-500 font-mono text-sm">// Küçük harcamaların büyük etkisi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {latteFactorItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <MatrixCard className="p-6 h-full">
                  <h3 className="text-base font-bold text-[#00FF41] font-mono mb-4">{item.name}</h3>
                    
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Günlük:</span>
                        <span className="text-gray-300">{item.dailyCost} TL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Yıllık:</span>
                        <span className="text-yellow-400 font-bold">{item.yearlyCost.toLocaleString()} TL</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-[#00FF41]/10 pt-2">
                        <span className="text-gray-500">10 Yılda:</span>
                        <span className="text-red-400 font-bold text-base">{item.tenYearCost.toLocaleString()} TL</span>
                      </div>
                    </div>

                    <div className="mt-4 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded p-3">
                      <p className="text-[#00FF41] text-xs font-mono">
                        <Sparkles className="w-3 h-3 inline mr-1" />
                        {item.alternative}
                      </p>
                    </div>
                  </MatrixCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <MatrixCard className="p-6">
              <h2 className="text-lg font-bold text-[#00FF41] font-mono mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                [HESAP_MAKINESI] Senin Hesabın
              </h2>
              <p className="text-gray-500 font-mono text-sm mb-4">
                Günlük sadece 50 TL'lik "küçük" harcama yapıyor olsan:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#001400] border border-[#00FF41]/20 p-4 text-center">
                  <p className="text-gray-500 font-mono text-xs mb-1">Yıllık</p>
                  <p className="text-2xl font-bold text-yellow-400 font-mono">18.250 TL</p>
                </div>
                <div className="bg-[#001400] border border-[#00FF41]/20 p-4 text-center">
                  <p className="text-gray-500 font-mono text-xs mb-1">5 Yılda</p>
                  <p className="text-2xl font-bold text-orange-400 font-mono">91.250 TL</p>
                </div>
                <div className="bg-[#001400] border border-[#00FF41]/20 p-4 text-center">
                  <p className="text-gray-500 font-mono text-xs mb-1">10 Yılda</p>
                  <p className="text-2xl font-bold text-red-400 font-mono">182.500 TL</p>
                </div>
              </div>
            </MatrixCard>
          </motion.div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleFinishLevel2}
              className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 py-6 text-lg font-bold font-mono rounded-none shadow-[0_0_20px_rgba(0,255,65,0.4)] btn-matrix"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              LEVEL 3'E GEÇ
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const necessaryTotal = scenario.expenses.filter(e => e.isNecessary).reduce((sum, e) => sum + e.amount, 0);
  const unnecessaryTotal = scenario.expenses.filter(e => !e.isNecessary).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-[#00FF41]/20 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#00FF41] matrix-glow font-mono tracking-wider">BÜTÇE SİMÜLASYONU</h1>
            <p className="text-gray-500 font-mono text-xs">// Senaryo {currentScenario + 1} / {level2Scenarios.length}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#001400] border border-[#00FF41]/30 px-3 py-1.5 font-mono text-sm">
              <span className="text-[#00FF41]">🪙 {user.coins}</span>
            </div>
            <div className="bg-[#001400] border border-[#00FF41]/30 px-3 py-1.5 font-mono text-sm">
              <span className="text-[#00FF41]">⭐ {user.xp} XP</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showScenarioResult ? (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MatrixCard className="p-6 mb-5">
                <h2 className="text-xl font-bold text-white font-mono mb-1">{scenario.title}</h2>
                <p className="text-gray-400 text-sm font-mono">{scenario.description}</p>
              </MatrixCard>

              <div className="grid md:grid-cols-2 gap-5">
                <MatrixCard className="p-6">
                  <h3 className="text-base font-bold text-[#00FF41] font-mono mb-4 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    [BÜTÇE_ANALİZİ]
                  </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Maaş:</span>
                        <span className="text-green-400 font-bold">{scenario.income.toLocaleString()} TL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Zorunlu Giderler:</span>
                        <span className="text-red-400">-{necessaryTotal.toLocaleString()} TL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Gereksiz Giderler:</span>
                        <span className="text-orange-400">-{unnecessaryTotal.toLocaleString()} TL</span>
                      </div>
                      <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                        <span className="text-white font-bold">Kalan:</span>
                        <span className={`font-bold text-xl ${
                          scenario.income - necessaryTotal - unnecessaryTotal >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {(scenario.income - necessaryTotal - unnecessaryTotal).toLocaleString()} TL
                        </span>
                      </div>
                    </div>
                  </MatrixCard>

                <MatrixCard className="p-6">
                  <h3 className="text-base font-bold text-[#00FF41] font-mono mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    [BEKLENMEDİK_OLAY]
                  </h3>
                    
                  {scenario.unexpectedEvents.map((event) => (
                      <div key={event.id} className="bg-[#001400] border border-[#00FF41]/20 p-4 rounded">
                        <h4 className="font-bold text-white font-mono text-sm mb-1">{event.title}</h4>
                        <p className="text-gray-400 text-xs font-mono mb-3">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`font-bold ${event.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                            {event.type === 'expense' ? '-' : '+'}{event.cost.toLocaleString()} TL
                          </span>
                          <div className="flex gap-2">
                            {event.type === 'expense' ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDecision('reject', event.cost)}
                                  className="border-red-500/50 text-red-400 hover:bg-red-500/20 rounded-none font-mono text-xs"
                                >
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                  Reddet
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleDecision('accept', event.cost)}
                                  className="bg-[#00FF41] text-black hover:bg-[#00CC33] rounded-none font-mono text-xs"
                                >
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Kabul Et
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleDecision('accept', -event.cost)}
                                className="bg-[#00FF41] text-black hover:bg-[#00CC33] rounded-none font-mono text-xs"
                              >
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Kabul Et
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </MatrixCard>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <MatrixCard className="p-8 text-center">
                  <div className="mb-6">
                    {budget >= 0 ? (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF41]/10 border border-[#00FF41]/40 mb-4">
                        <CheckCircle className="w-8 h-8 text-[#00FF41]" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/40 mb-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      </div>
                    )}
                    <h2 className={`text-2xl font-bold font-mono matrix-glow ${budget >= 0 ? 'text-[#00FF41]' : 'text-red-400'}`}>
                      {budget >= 0 ? '[BAŞARILI]' : '[UYARI]'}
                    </h2>
                  </div>

                  <div className="bg-[#001400] border border-[#00FF41]/20 p-5 mb-5">
                    <p className="text-gray-500 font-mono text-xs mb-2">SENARYO_SONUCU:</p>
                    <div className="flex justify-center items-center gap-4">
                      <span className="text-gray-400 font-mono text-sm">Kalan Bütçe:</span>
                      <span className={`text-3xl font-bold font-mono ${budget >= 0 ? 'text-[#00FF41]' : 'text-red-400'}`}>
                        {budget.toLocaleString()} TL
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-400 font-mono text-sm mb-6 max-w-lg mx-auto">
                    {budget >= 0 ? (
                      <p>Harika! Bütçeni kontrol altında tuttun. Bu disiplinle birikim yapabilirsin.</p>
                    ) : (
                      <p>Bütçen aşıldı. Gereksiz harcamaları azaltmak veya ek gelir aramak gerekebilir.</p>
                    )}
                  </div>

                  <Button
                    size="lg"
                    onClick={handleNextScenario}
                    className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 font-mono font-bold rounded-none shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                  >
                    DEVAM ET
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </MatrixCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
