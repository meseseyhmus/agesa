import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Landmark,
  Gamepad2,
  User,
  Trophy,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'landing', icon: Home, label: 'Ana Sayfa' },
  { id: 'level1', icon: BookOpen, label: 'Eğitim' },
  { id: 'retirement', icon: Landmark, label: 'BES' },
  { id: 'minigame', icon: Gamepad2, label: 'Oyunlar' },
  { id: 'leaderboard', icon: Trophy, label: 'Sıralama' },
  { id: 'profile', icon: User, label: 'Profil' },
] as const;

export function NavigationBar() {
  const { currentView, setCurrentView, user } = useGame();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* XP/Coin strip */}
      <div className="flex justify-center gap-4 pb-1 pt-1 px-4">
        <div className="flex items-center gap-1.5 bg-[#001400]/90 border border-[#00FF41]/30 rounded-full px-3 py-1 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#00FF41]" />
          <span className="text-[#00FF41] text-xs font-mono font-bold">{user.xp} XP</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#001400]/90 border border-[#00FF41]/30 rounded-full px-3 py-1 backdrop-blur-md">
          <span className="text-xs">🪙</span>
          <span className="text-[#00FF41] text-xs font-mono font-bold">{user.coins}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#001400]/90 border border-[#00FF41]/30 rounded-full px-3 py-1 backdrop-blur-md">
          <span className="text-xs">🏆</span>
          <span className="text-[#00FF41] text-xs font-mono font-bold">{user.badges.length}</span>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-[#0a0f0a]/95 backdrop-blur-xl border-t border-[#00FF41]/20 shadow-[0_-4px_30px_rgba(0,255,65,0.1)]">
        <div className="max-w-lg mx-auto flex justify-around items-center px-2 py-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'level1' && ['level1', 'level2', 'level3', 'quiz', 'boss'].includes(currentView)) ||
              (item.id === 'landing' && ['landing', 'pill-choice', 'awakening'].includes(currentView));

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className="relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all group"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#00FF41] rounded-full shadow-[0_0_8px_rgba(0,255,65,0.6)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}

                <div
                  className={`p-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#00FF41]/15 text-[#00FF41]'
                      : 'text-gray-500 group-hover:text-[#00FF41]/70 group-hover:bg-[#00FF41]/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-[#00FF41]' : 'text-gray-600 group-hover:text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Safe area for mobile */}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </motion.nav>
  );
}
