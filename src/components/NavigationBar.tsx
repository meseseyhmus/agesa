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
  { id: 'landing',     icon: Home,      label: 'Ana Sayfa' },
  { id: 'level1',      icon: BookOpen,  label: 'Eğitim'   },
  { id: 'retirement',  icon: Landmark,  label: 'BES'       },
  { id: 'minigame',    icon: Gamepad2,  label: 'Oyunlar'   },
  { id: 'leaderboard', icon: Trophy,    label: 'Sıralama'  },
  { id: 'profile',     icon: User,      label: 'Profil'    },
] as const;

export function NavigationBar() {
  const { currentView, setCurrentView, user } = useGame();

  return (
    <motion.nav
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col"
      style={{ width: '72px' }}
    >
      {/* Sidebar panel */}
      <div className="flex flex-col h-full bg-[#080f08]/95 backdrop-blur-xl border-r border-[#00FF41]/20 shadow-[4px_0_30px_rgba(0,255,65,0.08)]">

        {/* Logo / top accent */}
        <div className="flex items-center justify-center py-4 border-b border-[#00FF41]/15">
          <div className="w-9 h-9 flex items-center justify-center bg-[#00FF41]/10 border border-[#00FF41]/40 rounded">
            <Sparkles className="w-5 h-5 text-[#00FF41]" />
          </div>
        </div>

        {/* Nav items */}
        <div className="flex flex-col items-center gap-1 py-3 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'level1'   && ['level1','level2','level3','quiz','boss'].includes(currentView)) ||
              (item.id === 'landing'  && ['landing','pill-choice','awakening'].includes(currentView));

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className="relative w-full flex flex-col items-center gap-1 py-3 px-1 transition-all group"
              >
                {/* Active left-edge indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#00FF41] rounded-r-full shadow-[0_0_8px_rgba(0,255,65,0.7)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}

                <div
                  className={`p-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#00FF41]/15 text-[#00FF41]'
                      : 'text-gray-500 group-hover:text-[#00FF41]/70 group-hover:bg-[#00FF41]/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`text-[9px] font-mono font-medium leading-none transition-colors ${
                    isActive ? 'text-[#00FF41]' : 'text-gray-600 group-hover:text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stats strip at bottom */}
        <div className="border-t border-[#00FF41]/15 py-3 flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-0.5">
            <Sparkles className="w-3 h-3 text-[#00FF41]/60" />
            <span className="text-[#00FF41] text-[10px] font-mono font-bold">{user.xp}</span>
            <span className="text-gray-700 text-[8px] font-mono">XP</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px]">🪙</span>
            <span className="text-[#00FF41] text-[10px] font-mono font-bold">{user.coins}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px]">🏆</span>
            <span className="text-[#00FF41] text-[10px] font-mono font-bold">{user.badges.length}</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
