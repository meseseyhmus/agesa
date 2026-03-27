import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Wallet, 
  Home, 
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export function FutureSimulationPage() {
  const { user, calculateRetirementProjection, setCurrentView } = useGame();
  const future = calculateRetirementProjection();

  const getLifestyleColor = (lifestyle: string) => {
    switch (lifestyle) {
      case 'luxury': return 'text-[#00FFFF]';
      case 'comfortable': return 'text-[#00FF41]';
      case 'modest': return 'text-[#FFFF00]';
      case 'poor': return 'text-[#FF0000]';
      default: return 'text-gray-400';
    }
  };

  const getLifestyleEmoji = (lifestyle: string) => {
    switch (lifestyle) {
      case 'luxury': return '🏖️';
      case 'comfortable': return '🏠';
      case 'modest': return '🏡';
      case 'poor': return '🏚️';
      default: return '🏠';
    }
  };

  const getHealthEmoji = (health: string) => {
    switch (health) {
      case 'good': return '💪';
      case 'average': return '😐';
      case 'poor': return '😷';
      default: return '😐';
    }
  };

  const getHappinessEmoji = (score: number) => {
    if (score >= 80) return '😄';
    if (score >= 60) return '🙂';
    if (score >= 40) return '😐';
    return '😢';
  };

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0,255,65,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0,255,65,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0,255,65,0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 1 }}
            className="text-6xl mb-4"
          >
            🔮
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#00FF41] matrix-glow mb-2"
          >
            GELECEK SİMÜLASYONU
          </motion.h1>
          <p className="text-gray-400">Emeklilik dönemindeki hayatını gör</p>
        </div>

        {/* Age Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-4 bg-[#001400] border border-[#00FF41] px-8 py-4">
            <Calendar className="w-8 h-8 text-[#00FF41]" />
            <div>
              <p className="text-gray-400 text-sm">Yıl</p>
              <p className="text-3xl font-bold text-[#00FF41]">{new Date().getFullYear() + (56 - (user.age || 18))}</p>
            </div>
            <div className="w-px h-12 bg-[#00FF41]/30" />
            <div>
              <p className="text-gray-400 text-sm">Yaş</p>
              <p className="text-3xl font-bold text-[#00FF41]">56</p>
            </div>
          </div>
        </motion.div>

        {/* Main Result Card */}
        <MatrixCard className="p-8 mb-8" glowColor={future.lifestyle === 'poor' ? 'red' : 'green'}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-8xl mb-4"
            >
              {getLifestyleEmoji(future.lifestyle)}
            </motion.div>
            <h2 className={`text-3xl font-bold ${getLifestyleColor(future.lifestyle)}`}>
              {future.lifestyle === 'luxury' && 'Lüks Bir Hayat!'}
              {future.lifestyle === 'comfortable' && 'Rahat Bir Hayat'}
              {future.lifestyle === 'modest' && 'Mütevazi Bir Hayat'}
              {future.lifestyle === 'poor' && 'Zorlu Bir Hayat...'}
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#001400] border border-[#00FF41]/30 p-6 text-center"
            >
              <Wallet className="w-8 h-8 text-[#00FF41] mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-1">Toplam Birikim</p>
              <p className="text-2xl font-bold text-[#00FF41]">
                ₺{future.savings.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-[#001400] border border-[#00FF41]/30 p-6 text-center"
            >
              <TrendingUp className="w-8 h-8 text-[#00FF41] mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-1">Aylık Emekli Maaşı</p>
              <p className="text-2xl font-bold text-[#00FF41]">
                ₺{future.monthlyPension.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#001400] border border-[#00FF41]/30 p-6 text-center"
            >
              <Home className="w-8 h-8 text-[#00FF41] mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-1">Yaşam Tarzı</p>
              <p className={`text-2xl font-bold ${getLifestyleColor(future.lifestyle)}`}>
                {future.lifestyle === 'luxury' && 'Lüks'}
                {future.lifestyle === 'comfortable' && 'Rahat'}
                {future.lifestyle === 'modest' && 'Mütevazi'}
                {future.lifestyle === 'poor' && 'Zorlu'}
              </p>
            </motion.div>
          </div>
        </MatrixCard>

        {/* Health & Happiness */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <MatrixCard className="p-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{getHealthEmoji(future.health)}</span>
              <div>
                <p className="text-gray-400 text-sm">Sağlık Durumu</p>
                <p className="text-xl font-bold text-white">
                  {future.health === 'good' && 'İyi'}
                  {future.health === 'average' && 'Orta'}
                  {future.health === 'poor' && 'Zayıf'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Finansal stres sağlığını etkiler
                </p>
              </div>
            </div>
          </MatrixCard>

          <MatrixCard className="p-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{getHappinessEmoji(future.happiness)}</span>
              <div>
                <p className="text-gray-400 text-sm">Mutluluk Seviyesi</p>
                <p className="text-xl font-bold text-white">%{future.happiness}</p>
                <div className="w-32 h-2 bg-[#001400] rounded mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${future.happiness}%` }}
                    transition={{ delay: 1, duration: 1 }}
                    className={`h-full rounded ${
                      future.happiness >= 70 ? 'bg-[#00FF41]' :
                      future.happiness >= 40 ? 'bg-[#FFFF00]' :
                      'bg-[#FF0000]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </MatrixCard>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-8"
        >
          <MatrixCard className="p-6" glowColor={future.lifestyle === 'poor' ? 'red' : 'green'}>
            <div className="flex items-start gap-4">
              {future.lifestyle === 'poor' ? (
                <AlertTriangle className="w-8 h-8 text-[#FF0000] flex-shrink-0" />
              ) : (
                <Sparkles className="w-8 h-8 text-[#00FF41] flex-shrink-0" />
              )}
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${
                  future.lifestyle === 'poor' ? 'text-[#FF0000]' : 'text-[#00FF41]'
                }`}>
                  {future.lifestyle === 'poor' 
                    ? 'Dikkat! Değişim Zamanı!' 
                    : 'Harika! Böyle Devam Et!'}
                </h3>
                <p className="text-gray-300">
                  {future.lifestyle === 'luxury' && 
                    'Mükemmel! Finansal disiplinin sayesinde emekliliğinde lüks bir hayat sürüyorsun. Dünya turuna çıkabilir, istediğin her şeyi yapabilirsin!'}
                  {future.lifestyle === 'comfortable' && 
                    'Güzel! Emekliliğinde rahat bir hayat sürüyorsun. Endişelenmeden yaşayabilir, hobilerine zaman ayırabilirsin.'}
                  {future.lifestyle === 'modest' && 
                    'Emekliliğinde temel ihtiyaçlarını karşılayabiliyorsun ama fazla bir rahatın yok. Biraz daha birikim yapmak iyi olabilir.'}
                  {future.lifestyle === 'poor' && 
                    'Maalesef emekliliğinde zorlanıyorsun. Ama endişelenme! Hala zaman var. Şimdi harekete geçersen geleceğini değiştirebilirsin!'}
                </p>
              </div>
            </div>
          </MatrixCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentView('retirement')}
            className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Emeklilik Hesabına Dön
          </Button>
          <Button
            onClick={() => setCurrentView('level1')}
            className="bg-[#00FF41] text-black hover:bg-[#00CC33]"
          >
            Eğitime Başla
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
