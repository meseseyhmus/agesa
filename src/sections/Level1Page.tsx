import { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { csvModules, financialTraps } from '@/data/learningContent';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Terminal,
  Tag,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  mentorType?: 'strict' | 'empathetic';
}

const MODULE_ICONS: Record<string, string> = {
  M1: '💰',
  M2: '☕',
  M3: '🏦',
  M4: '📈',
  M5: '🚀',
};

export function Level1Page() {
  const {
    user,
    addXP,
    addCoins,
    completeModule,
    unlockBadge,
    setCurrentView,
  } = useGame();

  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showTraps, setShowTraps] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const module = csvModules[currentModuleIdx];

  useEffect(() => {
    setMessages([
      {
        id: 'welcome-' + currentModuleIdx,
        type: 'bot',
        content: `[SİSTEM] ${module.module_title} modülüne bağlanılıyor...\n\nMerhaba ${user.name}! Bu modülde "${module.title}" konusunu işleyeceğiz.\n\nİçeriği görmek için "başla" yaz ya da aşağıdaki düğmeye tıkla.`,
        mentorType: 'strict',
      },
    ]);
    setContentRevealed(false);
    setModuleCompleted(false);
  }, [currentModuleIdx, user.name, module.module_title, module.title]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    if (
      lowerMsg.includes('başla') ||
      lowerMsg.includes('hazır') ||
      lowerMsg.includes('evet') ||
      lowerMsg.includes('göster')
    ) {
      setContentRevealed(true);
      return module.body_text + `\n\n[MODÜL TAMAMLANIYOR...] +${module.xpReward} XP, +${module.coinReward} 🪙`;
    }

    if (lowerMsg.includes('anlamadım') || lowerMsg.includes('açıkla') || lowerMsg.includes('tekrar')) {
      return `[YENİDEN AÇIKLAMA]\n\nBu modülün temel mesajı: ${module.tags.map(t => '#' + t).join(' ')}\n\n${module.body_text.split('\n')[0]}\n\nDaha fazla soru varsa sormaya devam edebilirsin.`;
    }

    if (lowerMsg.includes('örnek') || lowerMsg.includes('neden')) {
      const examples: Record<string, string> = {
        M1: 'Örnek: Maaşı 15.000 TL olan Ahmet, ay sonunda hep 0 TL kalıyor. Kira (6k), faturalar (1.5k), yemek (3k) zorunlu = toplam 10.5k. Kalan 4.5k keyfi giderlere gidiyor. Farkındalık ilk adım!',
        M2: 'Örnek: Günlük 1 kahve (60 TL) + 1 atıştırmalık (40 TL) = günde 100 TL. Ayda 3.000 TL, yılda 36.500 TL! Bu para bir acil durum fonu olabilirdi.',
        M3: 'Örnek: Ayda 500 TL birikim yaparsan 1 yılda 6.000 TL. Bunun %50\'si otomatik gidiyorsa, 10 yılda 60.000+ TL (faiz dahil) biriktirebilirsin.',
        M4: 'Örnek: Enflasyon %65, banka faizin %50. Paranın reel değeri düşüyor! Döviz/altın/fon gibi enflasyon üstü araçlara bak.',
        M5: 'Örnek: 25 yaşında ayda 500 TL BES katkısı vs 35 yaşında 1000 TL. Devlet katkısı (%30) + zaman etkisi ile 25 yaşındaki çok daha fazla biriktirir.',
      };
      return examples[module.module_id] || 'Bu konuda pratik örnek: Her kavramı kendi hayatına uygula. Harcama kalemlerin ne?';
    }

    if (lowerMsg.includes('etiket') || lowerMsg.includes('tag') || lowerMsg.includes('konu')) {
      return `Bu modülün konuları: ${module.tags.map(t => '#' + t).join(', ')}\n\nTahmini süre: ${module.estimated_time_min} dakika`;
    }

    if (lowerMsg.includes('sonraki') || lowerMsg.includes('devam') || lowerMsg.includes('geç')) {
      return 'Önce bu modülü tamamla! "Modülü Tamamla" düğmesine tıkla ve sonraki adıma geç.';
    }

    return `[MENTOR] Güzel soru ${user.name}! Bu konuda düşünmek önemli. "${module.title}" modülünde öğrendiklerini günlük hayatına uygulamayı dene. Başka sorun var mı?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };
    setMessages(prev => [...prev, userMsg]);
    const inputCopy = input;
    setInput('');

    setTimeout(() => {
      const response = getAIResponse(inputCopy);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        mentorType: 'strict',
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleCompleteModule = () => {
    completeModule(module.content_id);
    addXP(module.xpReward);
    addCoins(module.coinReward);
    setModuleCompleted(true);
    setContentRevealed(true);

    if (currentModuleIdx === csvModules.length - 1) {
      unlockBadge('yolo-survivor');
    }
  };

  const handleNextModule = () => {
    if (currentModuleIdx < csvModules.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setModuleCompleted(false);
      setMessages([]);
    } else {
      setShowTraps(true);
    }
  };

  const handleFinish = () => {
    setCurrentView('level2');
  };

  /* ──────────────────── TRAPS SCREEN ──────────────────── */
  if (showTraps) {
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <AlertTriangle className="w-14 h-14 text-yellow-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
            <h1 className="text-3xl font-bold text-[#00FF41] matrix-glow font-mono tracking-widest mb-1">
              FİNANSAL TUZAKLAR
            </h1>
            <p className="text-gray-500 font-mono text-sm">// Bunlara dikkat et – Agent Smith'in silahları</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {financialTraps.map((trap, index) => (
              <motion.div
                key={trap.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
              >
                <MatrixCard className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{trap.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#00FF41] mb-2 flex items-center gap-2 font-mono">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        {trap.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{trap.description}</p>

                      <div className="bg-[#0a0a0a] border border-red-900/40 rounded p-3 mb-3">
                        <p className="text-red-400 text-xs font-mono mb-1">[AGENT_SMITH]:</p>
                        <p className="text-red-300 text-sm italic">"{trap.agentSmithTactic}"</p>
                      </div>

                      <div className="bg-[#001400] border border-[#00FF41]/20 rounded p-3 mb-3">
                        <p className="text-[#00FF41]/60 text-xs font-mono mb-1">[ÖRNEKLER]:</p>
                        <ul className="space-y-1">
                          {trap.examples.map((ex, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                              <span className="text-red-500">×</span> {ex}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-[#00FF41] flex-shrink-0 mt-0.5" />
                        <p className="text-[#00FF41] text-xs font-mono">{trap.solution}</p>
                      </div>
                    </div>
                  </div>
                </MatrixCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleFinish}
              className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 py-6 text-lg font-bold font-mono rounded-none shadow-[0_0_20px_rgba(0,255,65,0.4)] btn-matrix"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              LEVEL 2'YE GEÇ
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────── MAIN LEARNING SCREEN ──────────────────── */
  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-[#00FF41]/20 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#00FF41] matrix-glow font-mono tracking-wider">
              EĞİTİM MODÜLLERİ
            </h1>
            <p className="text-gray-500 font-mono text-xs mt-0.5">
              // Modül {currentModuleIdx + 1} / {csvModules.length} — {module.module_title}
            </p>
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

        {/* Progress bar */}
        <div className="mb-5 flex gap-1.5">
          {csvModules.map((m, idx) => (
            <div
              key={m.content_id}
              className={`h-1.5 flex-1 transition-all duration-500 ${
                idx < currentModuleIdx
                  ? 'bg-[#00FF41] shadow-[0_0_6px_rgba(0,255,65,0.6)]'
                  : idx === currentModuleIdx
                  ? 'bg-[#00FF41]/50 animate-pulse'
                  : 'bg-[#001400] border border-[#00FF41]/10'
              }`}
            />
          ))}
        </div>

        {/* Module selector tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {csvModules.map((m, idx) => (
            <button
              key={m.content_id}
              onClick={() => {
                if (idx <= currentModuleIdx) {
                  setCurrentModuleIdx(idx);
                  setModuleCompleted(false);
                  setMessages([]);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs whitespace-nowrap border transition-all ${
                idx === currentModuleIdx
                  ? 'bg-[#00FF41]/15 border-[#00FF41] text-[#00FF41]'
                  : idx < currentModuleIdx
                  ? 'bg-[#001400] border-[#00FF41]/30 text-[#00FF41]/60 hover:text-[#00FF41] hover:border-[#00FF41]/60 cursor-pointer'
                  : 'bg-[#0a0a0a] border-[#00FF41]/10 text-gray-600 cursor-not-allowed'
              }`}
            >
              <span>{MODULE_ICONS[m.module_id]}</span>
              <span>{m.module_id}</span>
            </button>
          ))}
        </div>

        {/* Module info card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModuleIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <MatrixCard className="p-5 mb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{module.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#00FF41]/50 font-mono text-xs">[{module.module_id}]</span>
                      <span className="text-[#00FF41]/50 font-mono text-xs">{module.module_title}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white font-mono">{module.title}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                        <Clock className="w-3 h-3" /> {module.estimated_time_min} dk
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#00FF41]/60 font-mono">
                        +{module.xpReward} XP
                      </span>
                      <span className="flex items-center gap-1 text-xs text-yellow-400/70 font-mono">
                        +{module.coinReward} 🪙
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-0.5 text-[10px] font-mono bg-[#00FF41]/10 text-[#00FF41]/70 border border-[#00FF41]/20 px-2 py-0.5 rounded"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Revealed content */}
              {contentRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-[#00FF41]/20"
                >
                  {module.body_text.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-gray-300 text-sm leading-relaxed font-mono ${i > 0 ? 'mt-3' : ''}`}>
                      {para}
                    </p>
                  ))}
                </motion.div>
              )}
            </MatrixCard>

            {/* Chat terminal */}
            <div className="bg-[#050E05] border border-[#00FF41]/30 rounded-none overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.1)]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#001400] border-b border-[#00FF41]/20">
                <Terminal className="w-4 h-4 text-[#00FF41]" />
                <span className="text-[#00FF41] font-mono text-xs">MENTOR_TERMINAL v2.1 — {module.module_id}</span>
                <div className="ml-auto flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-[#00FF41]/60" />
                </div>
              </div>

              <ScrollArea className="h-72 p-4" ref={scrollRef}>
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                          msg.type === 'bot'
                            ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        {msg.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div
                        className={`max-w-[80%] px-4 py-2.5 font-mono text-sm ${
                          msg.type === 'bot'
                            ? 'bg-[#001400] border border-[#00FF41]/20 text-[#00FF41]/90'
                            : 'bg-purple-900/30 border border-purple-500/20 text-purple-200'
                        }`}
                      >
                        {msg.content.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-1.5' : ''}>{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input area */}
              <div className="border-t border-[#00FF41]/20 p-3">
                {!moduleCompleted ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder='> "başla" yaz ya da soru sor...'
                        className="bg-[#001400] border-[#00FF41]/30 text-[#00FF41] placeholder:text-gray-600 font-mono text-sm rounded-none focus:border-[#00FF41] focus:ring-[#00FF41]/20"
                      />
                      <Button
                        onClick={handleSend}
                        className="bg-[#00FF41] text-black hover:bg-[#00CC33] rounded-none px-4"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {['başla', 'örnek ver', 'açıkla'].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => {
                            setInput(cmd);
                            setTimeout(() => {
                              const userMsg: Message = {
                                id: Date.now().toString(),
                                type: 'user',
                                content: cmd,
                              };
                              setMessages(prev => [...prev, userMsg]);
                              setTimeout(() => {
                                const response = getAIResponse(cmd);
                                setMessages(prev => [...prev, {
                                  id: (Date.now() + 1).toString(),
                                  type: 'bot',
                                  content: response,
                                  mentorType: 'strict',
                                }]);
                              }, 500);
                              setInput('');
                            }, 0);
                          }}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-[#00FF41]/5 border border-[#00FF41]/20 text-[#00FF41]/60 hover:text-[#00FF41] hover:bg-[#00FF41]/10 transition-all"
                        >
                          <ChevronRight className="w-2.5 h-2.5 inline" /> {cmd}
                        </button>
                      ))}
                      <button
                        onClick={handleCompleteModule}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] hover:bg-[#00FF41]/20 transition-all ml-auto"
                      >
                        <CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Modülü Tamamla
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#00FF41] font-mono text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>+{module.xpReward} XP &amp; +{module.coinReward} 🪙 kazanıldı</span>
                    </div>
                    <Button
                      onClick={handleNextModule}
                      className="bg-[#00FF41] text-black hover:bg-[#00CC33] rounded-none font-mono font-bold px-5"
                    >
                      {currentModuleIdx < csvModules.length - 1 ? 'Sonraki' : 'Tuzakları Gör'}
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Module list sidebar mini-preview */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {csvModules.map((m, idx) => (
                <div
                  key={m.content_id}
                  className={`p-3 border font-mono text-center transition-all ${
                    idx === currentModuleIdx
                      ? 'border-[#00FF41] bg-[#00FF41]/10'
                      : idx < currentModuleIdx
                      ? 'border-[#00FF41]/30 bg-[#001400]'
                      : 'border-[#00FF41]/10 bg-[#050E05]'
                  }`}
                >
                  <div className="text-xl mb-1">{MODULE_ICONS[m.module_id]}</div>
                  <p className={`text-[9px] leading-tight ${
                    idx === currentModuleIdx ? 'text-[#00FF41]' : idx < currentModuleIdx ? 'text-[#00FF41]/50' : 'text-gray-700'
                  }`}>
                    {m.module_id}
                  </p>
                  {idx < currentModuleIdx && (
                    <CheckCircle className="w-3 h-3 text-[#00FF41] mx-auto mt-0.5" />
                  )}
                  {idx === currentModuleIdx && (
                    <BookOpen className="w-3 h-3 text-[#00FF41] mx-auto mt-0.5 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
