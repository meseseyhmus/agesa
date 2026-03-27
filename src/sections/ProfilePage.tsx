import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { MatrixCard } from '@/components/MatrixCard';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Target,
  Gamepad2,
  RotateCcw,
  Award,
  Shield,
  Landmark,
  Sparkles,
  Trophy,
} from 'lucide-react';

export function ProfilePage() {
  const { 
    user, 
    getAvatarState, 
    setCurrentView, 
    resetGame,
    RETIREMENT_LEVELS,
  } = useGame();

  const avatar = getAvatarState();
  const nextLevelXP = user.avatarStage * 100;
  const currentLevelXP = (user.avatarStage - 1) * 100;
  const xpProgress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  const retirement = user.retirement;
  const levelInfo = RETIREMENT_LEVELS[retirement.level];

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

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('landing')} 
            className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/20"
          >
            <span className="text-xl mr-2">💊</span>
            Ana Sayfa
          </Button>
          <h1 className="text-2xl font-bold text-[#00FF41]">PROFİLİM</h1>
          <Button 
            variant="outline" 
            onClick={resetGame} 
            className="border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/20"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Sıfırla
          </Button>
        </div>

        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MatrixCard className="p-8 mb-6" glowColor="green">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(0,255,65,0.3)',
                      '0 0 40px rgba(0,255,65,0.5)',
                      '0 0 20px rgba(0,255,65,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-40 h-40 rounded-full flex items-center justify-center text-7xl bg-gradient-to-br ${
                    user.pillChoice === 'red'
                      ? 'from-[#440000] to-[#110000] border-[#FF0000]'
                      : 'from-[#004400] to-[#001100] border-[#00FF41]'
                  } border-4`}
                >
                  {avatar.stage === 1 && '😔'}
                  {avatar.stage === 2 && '😐'}
                  {avatar.stage === 3 && '🙂'}
                  {avatar.stage === 4 && '😎'}
                  {avatar.stage === 5 && '🦸'}
                </motion.div>
                <div className="absolute -bottom-2 -right-2 bg-[#001400] border border-[#00FF41] rounded-full p-2">
                  <span className="text-2xl">
                    {user.pillChoice === 'red' ? '💊' : '💤'}
                  </span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-[#00FF41] mb-1">{user.name}</h2>
                <p className="text-xl text-gray-400 mb-2">&quot;{avatar.matrixName}&quot;</p>
                
                {user.pillChoice === 'red' && (
                  <div className="inline-flex items-center gap-2 bg-[#FF0000]/20 border border-[#FF0000] px-3 py-1 mb-4">
                    <span className="text-[#FF0000] text-sm font-bold">KIRMIZI HAP</span>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Seviye {user.avatarStage}</span>
                    <span>{user.xp} / {nextLevelXP} XP</span>
                  </div>
                  <div className="relative h-3 bg-[#001400] border border-[#00FF41]/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#008F11] to-[#00FF41]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 px-4 py-2">
                    <span className="text-[#00FF41]">🪙 {user.coins}</span>
                  </div>
                  <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 px-4 py-2">
                    <span className="text-[#00FF41]">⭐ {user.xp} XP</span>
                  </div>
                  <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 px-4 py-2">
                    <span className="text-[#00FF41]">🏆 {user.badges.length} Rozet</span>
                  </div>
                </div>
              </div>
            </div>
          </MatrixCard>
        </motion.div>

        {/* Stats & Retirement Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MatrixCard className="p-6 h-full">
              <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                İSTATİSTİKLER
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#001400]">
                  <span className="text-gray-400">Tamamlanan Modüller</span>
                  <span className="text-[#00FF41] font-bold">{user.completedModules.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#001400]">
                  <span className="text-gray-400">Quiz Cevapları</span>
                  <span className="text-[#00FF41] font-bold">{user.quizAnswers.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#001400]">
                  <span className="text-gray-400">Mevcut Level</span>
                  <span className="text-[#00FF41] font-bold">Level {user.level}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#001400]">
                  <span className="text-gray-400">FOMO Skoru</span>
                  <span className={user.fomoScore > 70 ? 'text-[#FF0000]' : 'text-[#00FF41]'}>
                    {user.fomoScore}/100
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#001400]">
                  <span className="text-gray-400">Disiplin Skoru</span>
                  <span className="text-[#00FF41]">{user.disciplineScore}/100</span>
                </div>
              </div>
            </MatrixCard>
          </motion.div>

          {/* Retirement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MatrixCard className="p-6 h-full" glowColor="green">
              <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                EMEKLİLİK HESABI
              </h3>
              
              <div className="text-center mb-4">
                <span className="text-4xl">{getLevelIcon(retirement.level)}</span>
                <p className={`text-xl font-bold ${getLevelColor(retirement.level)}`}>
                  {levelInfo.name}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Toplam Birikim</span>
                  <span className="text-[#00FF41] font-bold">₺{retirement.totalBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Devlet Katkısı</span>
                  <span className="text-[#00FF41]">₺{retirement.governmentContribution.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hedef</span>
                  <span className="text-gray-400">₺{levelInfo.max.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={() => setCurrentView('retirement')}
                className="w-full bg-[#00FF41] text-black hover:bg-[#00CC33]"
              >
                <span className="text-xl mr-2">💰</span>
                Emeklilik Hesabını Yönet
              </Button>
            </MatrixCard>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MatrixCard className="p-6 mb-6">
            <h3 className="text-xl font-bold text-[#00FF41] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              ROZETLERİM
            </h3>
            
            {user.badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#001400] border border-[#00FF41]/30 p-4 text-center"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="text-white font-medium text-sm">{badge.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">Henüz rozet kazanmadın</p>
                <p className="text-gray-600 text-sm">Oyunları oyna ve rozetler topla!</p>
              </div>
            )}
          </MatrixCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={() => setCurrentView('leaderboard')}
            className="bg-[#00FF41]/20 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/30"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Liderlik Tablosu
          </Button>

          <Button
            onClick={() => setCurrentView('minigame')}
            className="bg-[#00FF41]/20 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/30"
          >
            <Gamepad2 className="w-5 h-5 mr-2" />
            Mini Oyunlar
          </Button>
          
          <Button
            onClick={() => setCurrentView('future')}
            className="bg-[#00FF41]/20 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/30"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Gelecek Simülasyonu
          </Button>
          
          {user.level < 3 && (
            <Button
              onClick={() => setCurrentView(`level${user.level + 1}` as any)}
              className="bg-[#00FF41] text-black hover:bg-[#00CC33]"
            >
              <Target className="w-5 h-5 mr-2" />
              Level {user.level + 1}&apos;e Geç
            </Button>
          )}
          
          <Button
            onClick={() => setCurrentView('boss')}
            className="bg-[#FF0000]/20 border border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/30"
          >
            <Shield className="w-5 h-5 mr-2" />
            Ajan Smith&apos;e Karşı Savaş
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
