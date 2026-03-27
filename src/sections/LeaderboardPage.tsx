import { useGame } from '@/context/GameContext';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Star, TrendingUp, Award } from 'lucide-react';
import type { LeaderboardEntry } from '@/types';

export function LeaderboardPage() {
  const { user, setCurrentView } = useGame();

  const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Agent_Smith_Stopper', avatar: '🦸', totalSavings: 2450000, level: 'Mentor', badges: 12 },
    { rank: 2, name: 'Morpheus_Fan', avatar: '😎', totalSavings: 1850000, level: 'Free', badges: 10 },
    { rank: 3, name: user.name || 'Sen', avatar: '👤', totalSavings: user.retirement.totalBalance, level: user.retirement.level, badges: user.badges.length, isCurrentUser: true },
    { rank: 4, name: 'Trinity_Saver', avatar: '🥷', totalSavings: 1250000, level: 'Master', badges: 8 },
    { rank: 5, name: 'Crypto_Neo', avatar: '💊', totalSavings: 850000, level: 'Master', badges: 7 },
  ].sort((a, b) => b.totalSavings - a.totalSavings).map((entry, index) => ({ ...entry, rank: index + 1 }));

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
          <Button
            onClick={() => setCurrentView('profile')}
            className="text-[#00FF41] hover:bg-[#00FF41]/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Profile Dön
          </Button>
          <h1 className="text-3xl font-bold text-[#00FF41] matrix-glow flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            LİDERLİK TABLOSU
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </div>

        <div className="grid gap-4">
          {mockLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MatrixCard 
                className={`p-4 ${entry.isCurrentUser ? 'border-2 border-[#00FF41] bg-[#00FF41]/5' : ''}`}
                glowColor={entry.rank === 1 ? 'green' : undefined}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 flex items-center justify-center font-bold text-2xl ${
                    entry.rank === 1 ? 'text-yellow-400' : 
                    entry.rank === 2 ? 'text-gray-300' : 
                    entry.rank === 3 ? 'text-amber-600' : 'text-[#00FF41]/50'
                  }`}>
                    #{entry.rank}
                  </div>
                  
                  <div className="w-12 h-12 bg-[#001400] border border-[#00FF41]/30 flex items-center justify-center text-2xl rounded">
                    {entry.avatar}
                  </div>

                  <div className="flex-1">
                    <p className={`font-bold text-lg ${entry.isCurrentUser ? 'text-[#00FF41]' : 'text-white'}`}>
                      {entry.name} {entry.isCurrentUser && '(Sen)'}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {entry.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" /> {entry.badges} Rozet
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400 font-mono">Toplam Birikim</p>
                    <p className="text-xl font-bold text-[#00FF41]">
                      ₺{entry.totalSavings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </MatrixCard>
            </motion.div>
          ))}
        </div>

        <MatrixCard className="p-6 mt-8" glowColor="blue">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-[#00FF41] flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-[#00FF41] font-bold mb-2">Nasıl Yükselirim?</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Daha fazla BES katkısı yaparak, mini oyunlarda başarılı olarak ve eğitimleri 
                tamamlayarak birikimini ve XP&apos;ni artırabilirsin. Unutma, en büyük rakibin 
                dünkü kendin ve Ajan Smith (enflasyon)!
              </p>
            </div>
          </div>
        </MatrixCard>
      </div>
    </div>
  );
}
