import { useState, useCallback, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { MatrixCard } from '@/components/MatrixCard';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Zap,
  TrendingUp,
  CheckCircle,
  XCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

/* ─── GAME 1: BUDGET BLASTER ─── */
const budgetItems = [
  { text: 'Kira', amount: 6000, type: 'necessary' as const },
  { text: 'Elektrik Faturası', amount: 500, type: 'necessary' as const },
  { text: 'Market Alışverişi', amount: 2000, type: 'necessary' as const },
  { text: 'Sağlık Sigortası', amount: 800, type: 'necessary' as const },
  { text: 'Ulaşım', amount: 600, type: 'necessary' as const },
  { text: 'Yeni Oyun Konsolu', amount: 12000, type: 'unnecessary' as const },
  { text: 'Lüks Restoran', amount: 2500, type: 'unnecessary' as const },
  { text: 'Designer Çanta', amount: 8000, type: 'unnecessary' as const },
  { text: 'Kullanmadığın Abonelik', amount: 400, type: 'unnecessary' as const },
  { text: 'Anlık Tatil', amount: 15000, type: 'unnecessary' as const },
  { text: 'Acil Durum Fonu', amount: 3000, type: 'save' as const },
  { text: 'Emeklilik Birikimi', amount: 2000, type: 'save' as const },
];

/* ─── GAME 2: MATRIX MEMORY ─── */
const symbols = ['💰', '📈', '🏦', '💳', '🪙', '📊'];
const createPairs = () => {
  const cards = [...symbols, ...symbols]
    .map((sym, i) => ({ id: i, symbol: sym, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

/* ─── GAME 3: COMPOUND CLICKER ─── */


type GameId = 'budget' | 'memory' | 'compound' | null;

export function MiniGamesPage() {
  const { addXP, addCoins, unlockBadge, user } = useGame();
  const [selectedGame, setSelectedGame] = useState<GameId>(null);

  /* ── BUDGET BLASTER state ── */
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [budgetScore, setBudgetScore] = useState(0);
  const budgetScoreRef = useRef(0); // tracks real-time score for stale closure safety
  const [budgetSaved, setBudgetSaved] = useState(0);
  const [budgetOver, setBudgetOver] = useState(false);
  const [budgetFeedback, setBudgetFeedback] = useState<'correct' | 'wrong' | null>(null);
  const shuffledBudget = useState(() => [...budgetItems].sort(() => Math.random() - 0.5))[0];

  /* ── MATRIX MEMORY state ── */
  const [memCards, setMemCards] = useState(() => createPairs());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [memMatched, setMemMatched] = useState(0);
  const [memMoves, setMemMoves] = useState(0);
  const [memOver, setMemOver] = useState(false);
  const [memLocked, setMemLocked] = useState(false);

  /* ── COMPOUND CLICKER state ── */
  const [balance, setBalance] = useState(1000);
  const [year, setYear] = useState(0);
  const [rate, setRate] = useState(0.1);
  const [clickXP, setClickXP] = useState(0);
  const [compoundOver, setCompoundOver] = useState(false);
  const TARGET = 10000;

  /* ─────── BUDGET BLASTER handlers ─────── */
  const handleBudgetChoice = (choice: 'keep' | 'cut') => {
    const item = shuffledBudget[budgetIdx];
    let correct = false;

    if (item.type === 'necessary' && choice === 'keep') correct = true;
    if (item.type === 'unnecessary' && choice === 'cut') correct = true;
    if (item.type === 'save' && choice === 'keep') correct = true;

    setBudgetFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      budgetScoreRef.current += 10;
      setBudgetScore(budgetScoreRef.current);
      if (item.type === 'save') setBudgetSaved(s => s + item.amount);
    }

    setTimeout(() => {
      setBudgetFeedback(null);
      if (budgetIdx < shuffledBudget.length - 1) {
        setBudgetIdx(i => i + 1);
      } else {
        setBudgetOver(true);
        // use ref for accurate score (no stale closure)
        if (budgetScoreRef.current >= 80) unlockBadge('impulse-resistance');
      }
    }, 700);
  };

  /* ─────── MATRIX MEMORY handlers ─────── */
  const handleMemCard = useCallback((cardId: number) => {
    if (memLocked) return;
    // Find card by its .id property (not array index)
    const card = memCards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newCards = memCards.map(c => c.id === cardId ? { ...c, flipped: true } : c);
    setMemCards(newCards);

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMemMoves(m => m + 1);
      setMemLocked(true);
      const [aId, bId] = newFlipped;
      const cardA = newCards.find(c => c.id === aId);
      const cardB = newCards.find(c => c.id === bId);
      if (cardA && cardB && cardA.symbol === cardB.symbol) {
        setTimeout(() => {
          setMemCards(prev => prev.map(c =>
            c.id === aId || c.id === bId ? { ...c, matched: true } : c
          ));
          setMemMatched(m => {
            const next = m + 1;
            if (next === symbols.length) setMemOver(true);
            return next;
          });
          setFlipped([]);
          setMemLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setMemCards(prev => prev.map(c =>
            c.id === aId || c.id === bId ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          setMemLocked(false);
        }, 900);
      }
    }
  }, [memCards, flipped, memLocked]);

  /* ─────── COMPOUND CLICKER handlers ─────── */
  const handleInvest = () => {
    if (year >= 30) return;
    const gain = balance * rate;
    setBalance(b => parseFloat((b + gain).toFixed(0)));
    setYear(y => y + 1);
    setClickXP(x => x + 5);
    if (balance + gain >= TARGET) setCompoundOver(true);
  };

  const handleRateUp = () => {
    if (user.coins >= 20) {
      addCoins(-20);
      setRate(r => Math.min(r + 0.05, 0.5));
    }
  };

  /* ─────── reward on finish ─────── */
  const finishGame = (xp: number, coins: number) => {
    addXP(xp);
    addCoins(coins);
    setSelectedGame(null);
    unlockBadge('impulse-resistance');
  };

  /* ─────── RESET helpers ─────── */
  const resetMemory = () => {
    setMemCards(createPairs());
    setFlipped([]);
    setMemMatched(0);
    setMemMoves(0);
    setMemOver(false);
    setMemLocked(false);
  };

  const resetCompound = () => {
    setBalance(1000);
    setYear(0);
    setRate(0.1);
    setClickXP(0);
    setCompoundOver(false);
  };

  /* ══════════════ BUDGET BLASTER ══════════════ */
  if (selectedGame === 'budget') {
    const item = shuffledBudget[budgetIdx];
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.15) 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6 border-b border-[#00FF41]/20 pb-3">
            <Button variant="ghost" onClick={() => setSelectedGame(null)} className="text-[#00FF41] hover:bg-[#00FF41]/10 font-mono text-sm px-3 rounded-none">
              <ArrowLeft className="w-4 h-4 mr-1" /> Geri
            </Button>
            <h1 className="text-lg font-bold text-[#00FF41] font-mono matrix-glow">BÜTÇE BLASTER</h1>
            <div className="bg-[#001400] border border-[#00FF41]/30 px-3 py-1 font-mono text-sm text-[#00FF41]">
              {budgetScore} puan
            </div>
          </div>

          {/* Progress */}
          <div className="h-1.5 bg-[#001400] mb-6">
            <div className="h-full bg-[#00FF41] transition-all" style={{ width: `${(budgetIdx / shuffledBudget.length) * 100}%` }} />
          </div>

          {!budgetOver ? (
            <AnimatePresence mode="wait">
              <motion.div key={budgetIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <MatrixCard className="p-8 text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 border mb-4 ${item.type === 'necessary' ? 'border-blue-500/50 bg-blue-500/10' : item.type === 'save' ? 'border-[#00FF41]/50 bg-[#00FF41]/10' : 'border-red-500/50 bg-red-500/10'}`}>
                    <span className="text-3xl">
                      {item.type === 'necessary' ? '📋' : item.type === 'save' ? '🏦' : '🛍️'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white font-mono mb-1">{item.text}</h2>
                  <p className="text-2xl font-bold text-yellow-400 font-mono">{item.amount.toLocaleString()} TL</p>
                  <p className="text-gray-600 font-mono text-xs mt-2">{budgetIdx + 1} / {shuffledBudget.length}</p>

                  {budgetFeedback && (
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={`mt-4 py-2 font-mono text-sm font-bold ${budgetFeedback === 'correct' ? 'text-[#00FF41]' : 'text-red-400'}`}>
                      {budgetFeedback === 'correct' ? '✓ Doğru! +10 puan' : '✗ Yanlış!'}
                    </motion.div>
                  )}
                </MatrixCard>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleBudgetChoice('cut')}
                    className="p-5 border-2 border-red-500/60 bg-red-500/10 hover:bg-red-500/20 text-center transition-all rounded">
                    <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                    <span className="text-red-300 font-bold font-mono">KES</span>
                    <p className="text-red-400/60 text-xs font-mono mt-1">Gereksiz</p>
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleBudgetChoice('keep')}
                    className="p-5 border-2 border-[#00FF41]/60 bg-[#00FF41]/10 hover:bg-[#00FF41]/20 text-center transition-all rounded">
                    <CheckCircle className="w-10 h-10 text-[#00FF41] mx-auto mb-2" />
                    <span className="text-[#00FF41] font-bold font-mono">TUTS</span>
                    <p className="text-[#00FF41]/60 text-xs font-mono mt-1">Zorunlu / Birikim</p>
                  </motion.button>
                </div>

                <p className="text-center text-gray-600 font-mono text-xs mt-4">Gereksiz harcamayı kes, zorunlu ve birikimi tut!</p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <MatrixCard className="p-8 text-center">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#00FF41] matrix-glow font-mono mb-2">OYUN BİTTİ!</h2>
                <p className="text-4xl font-bold text-[#00FF41] font-mono mb-1">{budgetScore}</p>
                <p className="text-gray-500 font-mono text-sm mb-4">/ {shuffledBudget.length * 10} puan</p>
                <p className="text-yellow-400 font-mono text-sm mb-6">Birikim kararları: {budgetSaved.toLocaleString()} TL</p>
                <Button onClick={() => finishGame(budgetScore, Math.floor(budgetScore / 5))}
                  className="bg-[#00FF41] text-black hover:bg-[#00CC33] font-bold font-mono rounded-none px-8 py-3 shadow-[0_0_15px_rgba(0,255,65,0.4)]">
                  <Sparkles className="w-4 h-4 mr-2" />ÖDÜLLÜ AL (+{Math.floor(budgetScore / 5)} 🪙)
                </Button>
              </MatrixCard>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════════ MATRIX MEMORY ══════════════ */
  if (selectedGame === 'memory') {
    const score = Math.max(0, 100 - memMoves * 5);
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.15) 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6 border-b border-[#00FF41]/20 pb-3">
            <Button variant="ghost" onClick={() => setSelectedGame(null)} className="text-[#00FF41] hover:bg-[#00FF41]/10 font-mono text-sm px-3 rounded-none">
              <ArrowLeft className="w-4 h-4 mr-1" /> Geri
            </Button>
            <h1 className="text-lg font-bold text-[#00FF41] font-mono matrix-glow">MATRİX HAFIZA</h1>
            <div className="flex gap-3 text-[#00FF41] font-mono text-sm">
              <span>{memMoves} hamle</span>
              <span>{memMatched}/{symbols.length} ✓</span>
            </div>
          </div>

          {!memOver ? (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {memCards.map((card) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleMemCard(card.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square border-2 flex items-center justify-center text-2xl transition-all ${
                    card.matched
                      ? 'border-[#00FF41] bg-[#00FF41]/15 cursor-default'
                      : card.flipped
                      ? 'border-[#00FF41]/60 bg-[#001400]'
                      : 'border-[#00FF41]/20 bg-[#050E05] hover:border-[#00FF41]/50 cursor-pointer'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {card.flipped || card.matched ? (
                      <motion.span key="front" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="text-2xl">{card.symbol}</motion.span>
                    ) : (
                      <motion.span key="back" className="text-[#00FF41]/20 font-mono text-sm">?</motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <MatrixCard className="p-8 text-center mb-4">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#00FF41] matrix-glow font-mono mb-2">TAMAMLANDI!</h2>
                <p className="text-gray-400 font-mono text-sm mb-1">{memMoves} hamlede çözdün</p>
                <p className="text-4xl font-bold text-[#00FF41] font-mono mb-4">{score} puan</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={resetMemory} variant="outline" className="border-[#00FF41]/40 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-none font-mono">
                    <RefreshCw className="w-4 h-4 mr-1" /> Tekrar
                  </Button>
                  <Button onClick={() => finishGame(score, Math.floor(score / 10))}
                    className="bg-[#00FF41] text-black hover:bg-[#00CC33] font-bold font-mono rounded-none px-6 shadow-[0_0_15px_rgba(0,255,65,0.4)]">
                    <Sparkles className="w-4 h-4 mr-2" />AL (+{Math.floor(score / 10)} 🪙)
                  </Button>
                </div>
              </MatrixCard>
            </motion.div>
          )}

          <p className="text-center text-gray-600 font-mono text-xs">Finansal sembolleri eşleştir!</p>
        </div>
      </div>
    );
  }

  /* ══════════════ COMPOUND CLICKER ══════════════ */
  if (selectedGame === 'compound') {
    const progress = Math.min((balance / TARGET) * 100, 100);
    return (
      <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.15) 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6 border-b border-[#00FF41]/20 pb-3">
            <Button variant="ghost" onClick={() => setSelectedGame(null)} className="text-[#00FF41] hover:bg-[#00FF41]/10 font-mono text-sm px-3 rounded-none">
              <ArrowLeft className="w-4 h-4 mr-1" /> Geri
            </Button>
            <h1 className="text-lg font-bold text-[#00FF41] font-mono matrix-glow">BİLEŞİK FAİZ</h1>
            <div className="bg-[#001400] border border-[#00FF41]/30 px-3 py-1 font-mono text-sm text-[#00FF41]">
              Yıl {year}/30
            </div>
          </div>

          <MatrixCard className="p-6 mb-4 text-center">
            <p className="text-gray-500 font-mono text-xs mb-1">TOPLAM BİRİKİM</p>
            <motion.p key={balance} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-4xl font-bold text-[#00FF41] matrix-glow font-mono mb-1">
              {balance.toLocaleString()} TL
            </motion.p>
            <p className="text-gray-600 font-mono text-xs">Hedef: {TARGET.toLocaleString()} TL</p>

            <div className="my-4 h-2 bg-[#001400] border border-[#00FF41]/10">
              <motion.div className="h-full bg-gradient-to-r from-[#008F11] to-[#00FF41]" animate={{ width: `${progress}%` }} />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs font-mono">
              <div className="bg-[#001400] border border-[#00FF41]/20 p-2">
                <p className="text-gray-600">Faiz Oranı</p>
                <p className="text-[#00FF41] font-bold">%{(rate * 100).toFixed(0)}</p>
              </div>
              <div className="bg-[#001400] border border-[#00FF41]/20 p-2">
                <p className="text-gray-600">Yıllık Kazanç</p>
                <p className="text-yellow-400 font-bold">{(balance * rate).toFixed(0)} TL</p>
              </div>
              <div className="bg-[#001400] border border-[#00FF41]/20 p-2">
                <p className="text-gray-600">Kalan Yıl</p>
                <p className="text-blue-400 font-bold">{30 - year}</p>
              </div>
            </div>
          </MatrixCard>

          {!compoundOver ? (
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleInvest}
                disabled={year >= 30}
                className="w-full py-5 bg-[#00FF41] text-black font-bold font-mono text-lg hover:bg-[#00CC33] transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] disabled:opacity-40"
              >
                <TrendingUp className="w-5 h-5 inline mr-2" />
                YIL GEÇIR (+1 yıl)
              </motion.button>

              <button onClick={handleRateUp} disabled={user.coins < 20} className="w-full py-3 border border-[#00FF41]/30 text-[#00FF41] font-mono text-sm hover:bg-[#00FF41]/10 disabled:opacity-30 transition-all">
                <Zap className="w-4 h-4 inline mr-1" /> Faiz Artır (%{(rate * 100).toFixed(0)} → %{Math.min((rate + 0.05) * 100, 50).toFixed(0)}) — 20 🪙 harca
              </button>

              <p className="text-center text-gray-600 font-mono text-xs">10.000 TL'ye ulaş! Her yıl bileşik faiz çalışır.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <MatrixCard className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-[#00FF41] matrix-glow font-mono mb-1">HEDEFE ULAŞILDI!</h2>
                <p className="text-gray-400 font-mono text-sm mb-3">{year} yılda {balance.toLocaleString()} TL biriktirdin!</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={resetCompound} variant="outline" className="border-[#00FF41]/40 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-none font-mono">
                    <RefreshCw className="w-4 h-4 mr-1" /> Tekrar
                  </Button>
                  <Button onClick={() => finishGame(clickXP + 50, 30)}
                    className="bg-[#00FF41] text-black hover:bg-[#00CC33] font-bold font-mono rounded-none px-6">
                    <Sparkles className="w-4 h-4 mr-2" />AL (+30 🪙)
                  </Button>
                </div>
              </MatrixCard>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════════ GAME SELECTION SCREEN ══════════════ */
  const games = [
    {
      id: 'budget' as GameId,
      icon: '🎯',
      title: 'BÜTÇE BLASTER',
      desc: 'Harcama kalemlerini hızla sınıflandır! Gereksizi kes, zorunlu ve birikimi koru.',
      xpReward: '10-100 XP',
      difficulty: '★★☆',
      color: 'red',
    },
    {
      id: 'memory' as GameId,
      icon: '🧠',
      title: 'MATRİX HAFIZA',
      desc: 'Finansal kavramları eşleştir! Ne kadar az hamlede çözersen o kadar çok puan.',
      xpReward: '50-100 XP',
      difficulty: '★★★',
      color: 'blue',
    },
    {
      id: 'compound' as GameId,
      icon: '📈',
      title: 'BİLEŞİK FAİZ',
      desc: 'Paranı yıl yıl büyüt! Faiz oranını artır, hedefe ulaş ve bileşik gücü keşfet.',
      xpReward: '50+ XP',
      difficulty: '★☆☆',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0208] relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.15) 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-2">
          <h1 className="text-3xl font-bold text-[#00FF41] matrix-glow font-mono tracking-widest mb-1">MİNİ OYUNLAR</h1>
          <p className="text-gray-600 font-mono text-sm">// Oynayarak finansal becerilerini geliştir</p>
        </div>

        <div className="space-y-4">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div onClick={() => setSelectedGame(game.id)} className="cursor-pointer">
              <MatrixCard className="p-5 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="text-4xl flex-shrink-0">{game.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-base font-bold text-[#00FF41] font-mono">{game.title}</h2>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-yellow-400">{game.xpReward}</span>
                        <span className="text-[#00FF41]/50">{game.difficulty}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm font-mono line-clamp-2">{game.desc}</p>
                  </div>
                  <div className="border border-[#00FF41]/30 p-2 ml-2 text-[#00FF41] hover:bg-[#00FF41]/10 transition-all">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </MatrixCard>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: '⭐', label: 'Toplam XP', value: user.xp },
            { icon: '🪙', label: 'Coinler', value: user.coins },
            { icon: '🏆', label: 'Rozetler', value: user.badges.length },
          ].map(stat => (
            <div key={stat.label} className="bg-[#001400] border border-[#00FF41]/20 p-3 text-center font-mono">
              <p className="text-base">{stat.icon}</p>
              <p className="text-[#00FF41] font-bold text-sm">{stat.value}</p>
              <p className="text-gray-600 text-[9px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
