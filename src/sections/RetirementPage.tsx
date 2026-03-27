import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  PiggyBank, 
  Landmark, 
  Target,
  Award,
  ArrowRight,
  Info
} from 'lucide-react';

export function RetirementPage() {
  const { user, contributeToRetirement, updateFundType, setCurrentView, RETIREMENT_LEVELS } = useGame();
  const [contributionAmount, setContributionAmount] = useState(1000);
  const [showSuccess, setShowSuccess] = useState(false);

  const retirement = user.retirement;
  const levelInfo = RETIREMENT_LEVELS[retirement.level];
  const progressToNext = ((retirement.totalBalance - levelInfo.min) / (levelInfo.max - levelInfo.min)) * 100;

  const handleContribute = () => {
    contributeToRetirement(contributionAmount);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'apprentice': return '🥉';
      case 'journeyman': return '🥈';
      case 'master': return '🥇';
      case 'mentor': return '💎';
      case 'free': return '🦅';
      default: return '🥉';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'apprentice': return 'text-[#CD7F32]';
      case 'journeyman': return 'text-[#C0C0C0]';
      case 'master': return 'text-[#FFD700]';
      case 'mentor': return 'text-[#E5E4E2]';
      case 'free': return 'text-[#00FFFF]';
      default: return 'text-[#CD7F32]';
    }
  };

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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#00FF41] matrix-glow mb-2"
          >
            SANAL EMEKLİLİK HESABI (SEH)
          </motion.h1>
          <p className="text-gray-400">Bireysel Emeklilik Sistemi Simülasyonu</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MatrixCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#00FF41]/20 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-[#00FF41]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Toplam Birikim</p>
                <p className="text-2xl font-bold text-[#00FF41]">
                  ₺{retirement.totalBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </MatrixCard>

          <MatrixCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#00FF41]/20 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-[#00FF41]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Devlet Katkısı</p>
                <p className="text-2xl font-bold text-[#00FF41]">
                  ₺{retirement.governmentContribution.toLocaleString()}
                </p>
              </div>
            </div>
          </MatrixCard>

          <MatrixCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#00FF41]/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#00FF41]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Fon Getirisi</p>
                <p className="text-2xl font-bold text-[#00FF41]">
                  ₺{retirement.fundReturn.toLocaleString()}
                </p>
              </div>
            </div>
          </MatrixCard>

          <MatrixCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#00FF41]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#00FF41]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Seviye</p>
                <p className={`text-2xl font-bold ${getLevelColor(retirement.level)}`}>
                  {getLevelIcon(retirement.level)} {levelInfo.name}
                </p>
              </div>
            </div>
          </MatrixCard>
        </div>

        {/* Progress Section */}
        <MatrixCard className="p-8 mb-8" glowColor="green">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-[#00FF41]" />
              <h3 className="text-xl font-bold text-white">Sonraki Seviyeye İlerleme</h3>
            </div>
            <span className="text-[#00FF41] font-bold">
              ₺{levelInfo.max.toLocaleString()}
            </span>
          </div>
          
          <div className="relative">
            <Progress 
              value={Math.min(100, Math.max(0, progressToNext))} 
              className="h-4 bg-[#001400]"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#008F11] to-[#00FF41] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, Math.max(0, progressToNext))}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>₺{levelInfo.min.toLocaleString()}</span>
            <span>{Math.round(progressToNext)}%</span>
            <span>₺{levelInfo.max.toLocaleString()}</span>
          </div>
        </MatrixCard>

        {/* Contribution Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <MatrixCard className="p-8">
            <h3 className="text-xl font-bold text-[#00FF41] mb-6">Katkı Yap</h3>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Katkı Miktarı</label>
              <div className="flex gap-2 mb-4">
                {[500, 1000, 2000, 5000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setContributionAmount(amount)}
                    className={`px-4 py-2 border transition-all ${
                      contributionAmount === amount
                        ? 'bg-[#00FF41] text-black border-[#00FF41]'
                        : 'bg-transparent text-[#00FF41] border-[#00FF41] hover:bg-[#00FF41]/20'
                    }`}
                  >
                    ₺{amount}
                  </button>
                ))}
              </div>
              
              <div className="bg-[#001400] p-4 border border-[#00FF41]/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Senin Katkın:</span>
                  <span className="text-white font-bold">₺{contributionAmount}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400">Devlet Katkısı (%30):</span>
                  <span className="text-[#00FF41] font-bold">₺{Math.round(contributionAmount * 0.3)}</span>
                </div>
                <div className="border-t border-[#00FF41]/30 mt-2 pt-2 flex justify-between items-center">
                  <span className="text-white">Toplam:</span>
                  <span className="text-[#00FF41] text-xl font-bold">₺{Math.round(contributionAmount * 1.3)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleContribute}
              className="w-full bg-[#00FF41] text-black hover:bg-[#00CC33] py-6 text-lg font-bold mb-8"
            >
              {showSuccess ? '✓ KATKI BAŞARILI!' : 'KATKI YAP'}
            </Button>

            <div className="border-t border-[#00FF41]/30 pt-6">
              <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                FON SEÇİMİ (AgeSA Stili)
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'safe', name: 'Güvenli Fon', desc: 'Düşük risk, istikrarlı getiri (%5)', emoji: '🛡️' },
                  { id: 'balanced', name: 'Dengeli Fon', desc: 'Orta risk, dengeli büyüme (%10)', emoji: '⚖️' },
                  { id: 'aggressive', name: 'Atak Fon', desc: 'Yüksek risk, yüksek potansiyel (%18)', emoji: '🚀' },
                ].map((fund) => (
                  <button
                    key={fund.id}
                    onClick={() => updateFundType(fund.id as any)}
                    className={`w-full p-4 border text-left transition-all ${
                      retirement.fundType === fund.id
                        ? 'bg-[#00FF41] text-black border-[#00FF41]'
                        : 'bg-transparent text-[#00FF41] border-[#00FF41]/30 hover:bg-[#00FF41]/10'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">{fund.emoji} {fund.name}</span>
                      {retirement.fundType === fund.id && <span className="text-xs font-bold">AKTİF</span>}
                    </div>
                    <p className={`text-xs ${retirement.fundType === fund.id ? 'text-black/70' : 'text-gray-400'}`}>
                      {fund.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </MatrixCard>

          <MatrixCard className="p-8">
            <h3 className="text-xl font-bold text-[#00FF41] mb-6">Emeklilik Seviyeleri</h3>
            
            <div className="space-y-3">
              {Object.entries(RETIREMENT_LEVELS).map(([key, info], index) => {
                const isCurrent = retirement.level === key;
                const isUnlocked = retirement.totalBalance >= info.min;
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border ${
                      isCurrent 
                        ? 'border-[#00FF41] bg-[#00FF41]/10' 
                        : isUnlocked
                        ? 'border-[#00FF41]/50 bg-[#00FF41]/5'
                        : 'border-gray-700 bg-transparent opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {key === 'apprentice' && '🥉'}
                          {key === 'journeyman' && '🥈'}
                          {key === 'master' && '🥇'}
                          {key === 'mentor' && '💎'}
                          {key === 'free' && '🦅'}
                        </span>
                        <div>
                          <p className={`font-bold ${isCurrent ? 'text-[#00FF41]' : 'text-white'}`}>
                            {info.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            ₺{info.min.toLocaleString()} - {info.max === Infinity ? '∞' : `₺${info.max.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="text-[#00FF41] text-sm">AKTİF</span>
                      )}
                      {!isCurrent && isUnlocked && (
                        <span className="text-[#00FF41]/50 text-sm">✓</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </MatrixCard>
        </div>

        {/* Info Box */}
        <MatrixCard className="p-6 mt-8" glowColor="blue">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#00FF41] flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-[#00FF41] font-bold mb-2">AgeSA BES (Bireysel Emeklilik Sistemi) Hakkında</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                BES, devlet destekli bir birikim sistemidir. Yaptığınız her katkının %30&apos;u kadar 
                devlet katkısı alırsınız. Emeklilik için **10 yıl sistemde kalma** ve **56 yaş** şartı 
                bulunmaktadır. Fonlarınızı yılda 12 kez değiştirebilir (AgeSA Mobil üzerinden), 
                birikimlerinizi Ak Portföy uzmanlığıyla değerlendirebilirsiniz.
              </p>
            </div>
          </div>
        </MatrixCard>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentView('profile')}
            className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/20"
          >
            Profile Dön
          </Button>
          <Button
            onClick={() => setCurrentView('future')}
            className="bg-[#00FF41] text-black hover:bg-[#00CC33]"
          >
            Gelecek Simülasyonu
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
