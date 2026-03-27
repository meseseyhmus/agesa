import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { csvModules, financialTraps } from '@/data/learningContent';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Tag,
  Clock,
  Lock,
  Star,
} from 'lucide-react';

const MODULE_ICONS: Record<string, string> = {
  M1: '💰', M2: '☕', M3: '🏦', M4: '📈', M5: '🚀',
};

export function Level1Page() {
  const { user, addXP, addCoins, completeModule, unlockBadge, setCurrentView } = useGame();

  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [showTraps, setShowTraps] = useState(false);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const module = csvModules[currentModuleIdx];
  const isCompleted = completedModules.has(currentModuleIdx);

  // Simple quiz per module
  const quizzes: Record<string, { question: string; options: string[]; correct: string }> = {
    M1: {
      question: 'Finansal farkındalığın ilk adımı nedir?',
      options: ['Daha fazla kazanmak', 'Harcamaları kategorilere ayırmak', 'Kredi çekmek', 'Tasarruf hesabı açmak'],
      correct: 'Harcamaları kategorilere ayırmak',
    },
    M2: {
      question: 'Günlük 60 TL kahve harcaması yılda kaç TL yapar?',
      options: ['10.000 TL', '15.000 TL', '21.900 TL', '30.000 TL'],
      correct: '21.900 TL',
    },
    M3: {
      question: 'Birikim için en önemli kural hangisidir?',
      options: ['Büyük miktarda biriktirmek', 'Düzenli ve otomatik biriktirmek', 'Sadece yılda bir biriktirmek', 'Yatırım fonlarına girmek'],
      correct: 'Düzenli ve otomatik biriktirmek',
    },
    M4: {
      question: 'Paranın değerini korumak için birikimin getirisi ne kadar olmalıdır?',
      options: ['Sıfır', 'Enflasyonun altında', 'Enflasyonun üzerinde', 'Enflasyona eşit'],
      correct: 'Enflasyonun üzerinde',
    },
    M5: {
      question: 'BES\'te devlet katkısı kaç yüzdedir?',
      options: ['%10', '%20', '%25', '%30'],
      correct: '%30',
    },
  };

  const quiz = quizzes[module.module_id];

  const handleCompleteModule = () => {
    if (!isCompleted && quizAnswer === quiz.correct) {
      completeModule(module.content_id);
      addXP(module.xpReward);
      addCoins(module.coinReward);
      setCompletedModules(prev => new Set([...prev, currentModuleIdx]));
      if (currentModuleIdx === csvModules.length - 1) {
        unlockBadge('yolo-survivor');
      }
    }
  };

  const handleNext = () => {
    if (currentModuleIdx < csvModules.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setQuizAnswer(null);
    } else {
      setShowTraps(true);
    }
  };

  const handlePrev = () => {
    if (currentModuleIdx > 0) {
      setCurrentModuleIdx(prev => prev - 1);
      setQuizAnswer(null);
    }
  };

  /* ─────────── FINANCIAL TRAPS SCREEN ─────────── */
  if (showTraps) {
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <AlertTriangle className="w-14 h-14 text-yellow-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
            <h1 className="text-3xl font-bold text-[#00FF41] matrix-glow font-mono tracking-widest mb-1">FİNANSAL TUZAKLAR</h1>
            <p className="text-gray-500 font-mono text-sm">// Agent Smith'in kullandığı silahlar</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {financialTraps.map((trap, index) => (
              <motion.div key={trap.id} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <MatrixCard className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{trap.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#00FF41] mb-2 font-mono flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />{trap.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{trap.description}</p>
                      <div className="bg-[#0a0a0a] border border-red-900/40 rounded p-2.5 mb-3">
                        <p className="text-red-400 text-xs font-mono mb-1">[AGENT_SMITH]:</p>
                        <p className="text-red-300 text-sm italic">"{trap.agentSmithTactic}"</p>
                      </div>
                      <div className="space-y-1 mb-3">
                        {trap.examples.map((ex, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                            <span className="text-red-500">×</span> {ex}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-[#00FF41] flex-shrink-0 mt-0.5" />
                        <p className="text-[#00FF41]/80 text-xs font-mono">{trap.solution}</p>
                      </div>
                    </div>
                  </div>
                </MatrixCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => setCurrentView('level2')} className="bg-[#00FF41] text-black hover:bg-[#00CC33] px-12 py-6 text-lg font-bold font-mono rounded-none shadow-[0_0_20px_rgba(0,255,65,0.4)]">
              <Sparkles className="w-5 h-5 mr-2" />LEVEL 2'YE GEÇ<ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────── MAIN LEARNING SCREEN ─────────── */
  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-[#00FF41]/20 pb-4">
          <div>
            <h1 className="text-xl font-bold text-[#00FF41] matrix-glow font-mono tracking-wider">EĞİTİM MODÜLLERİ</h1>
            <p className="text-gray-600 font-mono text-xs">{currentModuleIdx + 1} / {csvModules.length}</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-[#001400] border border-[#00FF41]/30 px-3 py-1 font-mono text-xs text-[#00FF41]">🪙 {user.coins}</div>
            <div className="bg-[#001400] border border-[#00FF41]/30 px-3 py-1 font-mono text-xs text-[#00FF41]">⭐ {user.xp} XP</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-5">
          {csvModules.map((_, idx) => (
            <button key={idx} onClick={() => idx < currentModuleIdx || completedModules.has(idx) ? (setCurrentModuleIdx(idx), setQuizAnswer(null)) : null}
              className={`h-1.5 flex-1 transition-all ${idx < currentModuleIdx || completedModules.has(idx) ? 'bg-[#00FF41] cursor-pointer' : idx === currentModuleIdx ? 'bg-[#00FF41]/40 animate-pulse' : 'bg-[#001400] border border-[#00FF41]/10'}`} />
          ))}
        </div>

        {/* Module Cards Navigation */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {csvModules.map((m, idx) => (
            <button key={m.content_id}
              onClick={() => { if (idx <= currentModuleIdx || completedModules.has(idx)) { setCurrentModuleIdx(idx); setQuizAnswer(null); } }}
              className={`flex-shrink-0 flex flex-col items-center px-3 py-2 border font-mono text-xs transition-all rounded ${
                idx === currentModuleIdx ? 'bg-[#00FF41]/15 border-[#00FF41] text-[#00FF41]'
                : completedModules.has(idx) ? 'bg-[#001400] border-[#00FF41]/30 text-[#00FF41]/60 hover:border-[#00FF41]/60 cursor-pointer'
                : idx < currentModuleIdx ? 'bg-[#001400] border-[#00FF41]/20 text-gray-500 cursor-pointer'
                : 'bg-[#050505] border-gray-800 text-gray-700 cursor-not-allowed'
              }`}
            >
              <span className="text-base">{MODULE_ICONS[m.module_id]}</span>
              <span className="text-[9px] mt-0.5">{m.module_id}</span>
              {completedModules.has(idx) && <CheckCircle className="w-2.5 h-2.5 text-[#00FF41] mt-0.5" />}
              {!completedModules.has(idx) && idx > currentModuleIdx && <Lock className="w-2.5 h-2.5 text-gray-700 mt-0.5" />}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={currentModuleIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>

            {/* Main article card */}
            <MatrixCard className="p-0 mb-4 overflow-hidden">
              {/* Card header */}
              <div className="bg-[#001400] border-b border-[#00FF41]/20 px-5 py-3 flex items-center gap-3">
                <span className="text-2xl">{module.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF41]/50 font-mono text-[10px]">[{module.module_id}]</span>
                    <span className="text-[#00FF41]/50 font-mono text-[10px]">{module.module_title}</span>
                  </div>
                  <h2 className="text-base font-bold text-white font-mono">{module.title}</h2>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] text-gray-600 font-mono">
                    <Clock className="w-3 h-3" /> {module.estimated_time_min} dk
                  </span>
                  {isCompleted && <CheckCircle className="w-4 h-4 text-[#00FF41]" />}
                </div>
              </div>

              {/* Body text */}
              <div className="p-5">
                <div className="space-y-4 mb-5">
                  {module.body_text.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed font-mono ${i === 0 ? 'text-gray-200' : 'text-gray-400'}`}>{para}</p>
                  ))}
                </div>

                {/* Key tip box */}
                <div className="bg-[#00FF41]/5 border-l-2 border-[#00FF41] pl-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-3.5 h-3.5 text-[#00FF41]" />
                    <span className="text-[#00FF41] font-mono text-xs font-bold">ANAHTAR FIKIR</span>
                  </div>
                  <p className="text-[#00FF41]/80 text-xs font-mono">
                    {module.module_id === 'M1' && 'Önce zorunlu → sonra birikim → kalanla keyfi harcama.'}
                    {module.module_id === 'M2' && 'Günlük 60 TL = Yılda 21.900 TL = 10 yılda 219.000 TL.'}
                    {module.module_id === 'M3' && 'Otomatik birikim > "canım isterse biriktiririm" prensibi.'}
                    {module.module_id === 'M4' && 'Getiri > Enflasyon olmalı, aksi hâlde para eriyalır.'}
                    {module.module_id === 'M5' && 'BES devlet katkısı %30 + zaman etkisi = güçlü birikim.'}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap mt-4">
                  {module.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[9px] font-mono bg-[#00FF41]/5 border border-[#00FF41]/20 text-[#00FF41]/60 px-2 py-0.5 rounded">
                      <Tag className="w-2 h-2" />#{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rewards strip */}
              <div className="bg-[#050E05] border-t border-[#00FF41]/10 px-5 py-2 flex items-center gap-4">
                <BookOpen className="w-3.5 h-3.5 text-[#00FF41]/40" />
                <span className="text-[#00FF41]/40 font-mono text-[10px]">Bu modülü tamamla:</span>
                <span className="text-[#00FF41] font-mono text-[10px] font-bold">+{module.xpReward} XP</span>
                <span className="text-yellow-400 font-mono text-[10px] font-bold">+{module.coinReward} 🪙</span>
              </div>
            </MatrixCard>

            {/* Quiz */}
            <MatrixCard className="p-5 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-[#00FF41] rounded-full" />
                <h3 className="text-sm font-bold text-[#00FF41] font-mono">HIZLI QUIZ</h3>
              </div>
              <p className="text-white text-sm font-mono mb-3">{quiz.question}</p>
              <div className="grid grid-cols-1 gap-2">
                {quiz.options.map(opt => {
                  const selected = quizAnswer === opt;
                  const isCorrect = opt === quiz.correct;
                  const showResult = quizAnswer !== null;
                  return (
                    <button
                      key={opt}
                      onClick={() => !quizAnswer && setQuizAnswer(opt)}
                      disabled={!!quizAnswer}
                      className={`text-left px-4 py-2.5 border font-mono text-sm transition-all ${
                        showResult
                          ? isCorrect
                            ? 'bg-[#00FF41]/15 border-[#00FF41] text-[#00FF41]'
                            : selected
                            ? 'bg-red-500/15 border-red-500 text-red-400'
                            : 'bg-transparent border-[#00FF41]/10 text-gray-600'
                          : 'bg-transparent border-[#00FF41]/20 text-gray-300 hover:border-[#00FF41]/60 hover:bg-[#00FF41]/5 cursor-pointer'
                      }`}
                    >
                      <span className="text-[#00FF41]/40 mr-2">›</span>{opt}
                    </button>
                  );
                })}
              </div>
              {quizAnswer && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`mt-3 p-3 border text-xs font-mono ${quizAnswer === quiz.correct ? 'bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                  {quizAnswer === quiz.correct ? '✓ Doğru! Modülü tamamlayabilirsin.' : `✗ Yanlış. Doğru cevap: "${quiz.correct}"`}
                </motion.div>
              )}
            </MatrixCard>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3">
              <Button onClick={handlePrev} disabled={currentModuleIdx === 0} variant="outline" className="border-[#00FF41]/30 text-[#00FF41]/70 hover:border-[#00FF41] hover:text-[#00FF41] bg-transparent rounded-none font-mono text-sm px-5">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Önceki
              </Button>

              {!isCompleted ? (
                <Button
                  onClick={handleCompleteModule}
                  disabled={quizAnswer !== quiz.correct}
                  className={`flex-1 font-mono font-bold rounded-none text-sm py-2.5 ${quizAnswer === quiz.correct ? 'bg-[#00FF41] text-black hover:bg-[#00CC33] shadow-[0_0_15px_rgba(0,255,65,0.3)]' : 'bg-[#001400] text-[#00FF41]/40 border border-[#00FF41]/10 cursor-not-allowed'}`}
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  {quizAnswer !== quiz.correct ? 'Önce Quiz\'i Tamamla' : `Modülü Tamamla (+${module.xpReward} XP)`}
                </Button>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 bg-[#00FF41]/10 border border-[#00FF41]/30 py-2.5 font-mono text-sm text-[#00FF41]">
                  <CheckCircle className="w-4 h-4" /> Tamamlandı!
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={!isCompleted && currentModuleIdx < csvModules.length - 1}
                className="bg-[#001400] border border-[#00FF41]/20 text-[#00FF41]/60 hover:bg-[#00FF41]/10 hover:text-[#00FF41] rounded-none font-mono text-sm px-5 disabled:opacity-30"
              >
                {currentModuleIdx === csvModules.length - 1 ? 'Tuzaklar' : 'Sonraki'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
