import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Sword, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface Attack {
  id: string;
  name: string;
  damage: number;
  description: string;
  icon: React.ReactNode;
}

const AGENT_SMITH_ATTACKS: Attack[] = [
  { 
    id: 'inflation', 
    name: 'Enflasyon Saldırısı', 
    damage: 15, 
    description: 'Paranın değerini eritiyor!',
    icon: <TrendingUp className="w-5 h-5" />
  },
  { 
    id: 'interest', 
    name: 'Faiz Tuzağı', 
    damage: 20, 
    description: 'Borçlarınız büyüyor!',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  { 
    id: 'debt', 
    name: 'Borç Kıskacı', 
    damage: 25, 
    description: 'Kredi kartı borcunuz artıyor!',
    icon: <Shield className="w-5 h-5" />
  },
];

const PLAYER_ATTACKS: Attack[] = [
  { 
    id: 'save', 
    name: 'Tasarruf Kalkanı', 
    damage: 20, 
    description: 'Düzenli birikim yap!',
    icon: <Shield className="w-5 h-5" />
  },
  { 
    id: 'invest', 
    name: 'Yatırım Saldırısı', 
    damage: 30, 
    description: 'Paranı değerlendir!',
    icon: <TrendingUp className="w-5 h-5" />
  },
  { 
    id: 'budget', 
    name: 'Bütçe Planı', 
    damage: 25, 
    description: 'Harcamalarını kontrol et!',
    icon: <Zap className="w-5 h-5" />
  },
];

export function BossFightPage() {
  const { user, addXP, addCoins, unlockBadge, setCurrentView } = useGame();
  
  const [agentHealth, setAgentHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState<'win' | 'lose' | null>(null);
  const [shake, setShake] = useState(false);

  const addLog = (message: string) => {
    setBattleLog(prev => [message, ...prev].slice(0, 5));
  };

  const handlePlayerAttack = (attack: Attack) => {
    if (!isPlayerTurn || gameOver) return;

    setShake(true);
    setTimeout(() => setShake(false), 300);

    const damage = attack.damage + Math.floor(Math.random() * 10);
    const newAgentHealth = Math.max(0, agentHealth - damage);
    setAgentHealth(newAgentHealth);
    
    addLog(`✓ ${attack.name}: ${damage} hasar!`);

    if (newAgentHealth <= 0) {
      setGameOver('win');
      addXP(500);
      addCoins(250);
      unlockBadge('agent-smith-defeated');
      return;
    }

    setIsPlayerTurn(false);

    // Agent's turn
    setTimeout(() => {
      const agentAttack = AGENT_SMITH_ATTACKS[Math.floor(Math.random() * AGENT_SMITH_ATTACKS.length)];
      const agentDamage = agentAttack.damage + Math.floor(Math.random() * 5);
      const newPlayerHealth = Math.max(0, playerHealth - agentDamage);
      
      setPlayerHealth(newPlayerHealth);
      addLog(`✗ Ajan Smith: ${agentAttack.name}! -${agentDamage} hasar`);

      if (newPlayerHealth <= 0) {
        setGameOver('lose');
      } else {
        setIsPlayerTurn(true);
      }
    }, 1500);
  };

  const handleContinue = () => {
    setCurrentView('future');
  };

  const handleRetry = () => {
    setAgentHealth(100);
    setPlayerHealth(100);
    setBattleLog([]);
    setGameOver(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      {/* Rain Effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#C0C0C0] font-mono text-xs"
            style={{ left: `${i * 5}%` }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j}>Mr. Anderson?</div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-[#C0C0C0] mb-2"
            style={{ textShadow: '0 0 20px rgba(192,192,192,0.5)' }}
          >
            AJAN SMITH
          </motion.h1>
          <p className="text-gray-500">&quot;Mr. Anderson... Bekliyordum...&quot;</p>
        </div>

        {/* Battle Arena */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Agent Smith */}
          <motion.div
            animate={shake && !isPlayerTurn ? { x: [-5, 5, -5, 0] } : {}}
            className="relative"
          >
            <MatrixCard className="p-6" glowColor="red">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(192,192,192,0.3)',
                      '0 0 40px rgba(192,192,192,0.5)',
                      '0 0 20px rgba(192,192,192,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-gray-400"
                >
                  <span className="text-5xl">🕶️</span>
                </motion.div>
                
                <h3 className="text-xl font-bold text-[#C0C0C0] mb-2">Ajan Smith</h3>
                <p className="text-sm text-gray-500 mb-4">Enflasyon + Faiz + Borç</p>
                
                {/* Health Bar */}
                <div className="relative">
                  <Progress value={agentHealth} className="h-4 bg-[#330000]" />
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF0000] to-[#990000] rounded-full transition-all duration-500"
                    style={{ width: `${agentHealth}%` }}
                  />
                </div>
                <p className="text-right text-[#FF0000] text-sm mt-1">{agentHealth}/100</p>
              </div>
            </MatrixCard>
          </motion.div>

          {/* Player */}
          <motion.div
            animate={shake && isPlayerTurn ? { x: [-5, 5, -5, 0] } : {}}
          >
            <MatrixCard className="p-6" glowColor="green">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(0,255,65,0.3)',
                      '0 0 40px rgba(0,255,65,0.5)',
                      '0 0 20px rgba(0,255,65,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#004400] to-[#001100] flex items-center justify-center border-2 border-[#00FF41]"
                >
                  <span className="text-5xl">{user.avatarStage >= 4 ? '🦸' : '😎'}</span>
                </motion.div>
                
                <h3 className="text-xl font-bold text-[#00FF41] mb-2">{user.name || 'Neo'}</h3>
                <p className="text-sm text-gray-500 mb-4">Finansal Savaşçı</p>
                
                {/* Health Bar */}
                <div className="relative">
                  <Progress value={playerHealth} className="h-4 bg-[#001400]" />
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#008F11] to-[#00FF41] rounded-full transition-all duration-500"
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
                <p className="text-right text-[#00FF41] text-sm mt-1">{playerHealth}/100</p>
              </div>
            </MatrixCard>
          </motion.div>
        </div>

        {/* Game Over */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-8"
            >
              <MatrixCard className="p-8" glowColor={gameOver === 'win' ? 'green' : 'red'}>
                <div className="text-6xl mb-4">
                  {gameOver === 'win' ? '🏆' : '💀'}
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${
                  gameOver === 'win' ? 'text-[#00FF41]' : 'text-[#FF0000]'
                }`}>
                  {gameOver === 'win' ? 'ZAFER!' : 'YENİLGİ...'}
                </h2>
                <p className="text-gray-300 mb-6">
                  {gameOver === 'win' 
                    ? 'Ajan Smith\'i yendin! Finansal özgürlüğe bir adım daha yaklaştın!' 
                    : 'Ajan Smith seni yendi... Ama pes etme! Tekrar dene!'}
                </p>
                
                {gameOver === 'win' && (
                  <div className="flex justify-center gap-4 mb-6">
                    <div className="bg-[#00FF41]/20 px-4 py-2 rounded">
                      <span className="text-[#00FF41]">+500 XP</span>
                    </div>
                    <div className="bg-[#00FF41]/20 px-4 py-2 rounded">
                      <span className="text-[#00FF41]">+250 🪙</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  {gameOver === 'lose' ? (
                    <Button
                      onClick={handleRetry}
                      className="bg-[#00FF41] text-black hover:bg-[#00CC33]"
                    >
                      <Sword className="w-4 h-4 mr-2" />
                      Tekrar Dene
                    </Button>
                  ) : (
                    <Button
                      onClick={handleContinue}
                      className="bg-[#00FF41] text-black hover:bg-[#00CC33]"
                    >
                      Devam Et
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </MatrixCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Battle Log */}
        {!gameOver && (
          <MatrixCard className="p-4 mb-6">
            <h4 className="text-[#00FF41] font-bold mb-2">Savaş Günlüğü</h4>
            <div className="space-y-1 font-mono text-sm">
              {battleLog.length === 0 ? (
                <p className="text-gray-500">Savaş başladı! Sıra sende...</p>
              ) : (
                battleLog.map((log, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={log.startsWith('✓') ? 'text-[#00FF41]' : 'text-[#FF0000]'}
                  >
                    {log}
                  </motion.p>
                ))
              )}
            </div>
          </MatrixCard>
        )}

        {/* Attack Buttons */}
        {!gameOver && (
          <div className="grid grid-cols-3 gap-4">
            {PLAYER_ATTACKS.map((attack, index) => (
              <motion.button
                key={attack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlayerAttack(attack)}
                disabled={!isPlayerTurn}
                className={`
                  p-4 border-2 rounded-lg transition-all
                  ${isPlayerTurn 
                    ? 'border-[#00FF41] bg-[#00FF41]/10 hover:bg-[#00FF41]/20 text-[#00FF41]' 
                    : 'border-gray-700 bg-gray-900/50 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex justify-center mb-2">{attack.icon}</div>
                <p className="font-bold text-sm">{attack.name}</p>
                <p className="text-xs opacity-70 mt-1">{attack.description}</p>
                <p className="text-lg font-bold mt-2">{attack.damage} Hasar</p>
              </motion.button>
            ))}
          </div>
        )}

        {/* Turn Indicator */}
        {!gameOver && (
          <div className="text-center mt-6">
            <p className={`text-lg font-bold ${
              isPlayerTurn ? 'text-[#00FF41]' : 'text-[#C0C0C0]'
            }`}>
              {isPlayerTurn ? '→ SIRA SENDE!' : '← AJAN SMITH DÜŞÜNÜYOR...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
