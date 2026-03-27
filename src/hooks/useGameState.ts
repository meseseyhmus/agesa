import { useState, useCallback, useEffect } from 'react';
import type { 
  User, 
  UserCharacter, 
  GameLevel, 
  Badge, 
  QuizAnswer,
  AvatarState,
  PillChoice,
  RetirementAccount,
  RetirementLevel,
  FutureSimulation
} from '@/types';

const INITIAL_RETIREMENT: RetirementAccount = {
  totalBalance: 0,
  userContribution: 0,
  governmentContribution: 0,
  fundReturn: 0,
  targetAmount: 50000,
  yearsToRetirement: 38, // 56 - 18 = 38
  monthlyContribution: 1000,
  level: 'apprentice',
  fundType: 'balanced',
};

const INITIAL_USER: User = {
  id: '',
  name: '',
  character: null,
  level: 0,
  xp: 0,
  coins: 0,
  avatarStage: 1,
  badges: [],
  completedModules: [],
  quizAnswers: [],
  pillChoice: null,
  retirement: INITIAL_RETIREMENT,
  age: 18,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  totalSavings: 0,
  debt: 0,
  fomoScore: 50,
  disciplineScore: 50,
};

const BADGES: Badge[] = [
  {
    id: 'impulse-resistance',
    name: 'Dürtüsel Harcamaya Direnen',
    description: 'İlk dürtüsel harcama durduruldu',
    icon: '🛡️',
    unlockedAt: new Date(),
    category: 'resistance',
  },
  {
    id: 'present-bias-breaker',
    name: 'Bugün Yanılgısını Kıran',
    description: 'Present Bias tuzaklarını aştın',
    icon: '⚡',
    unlockedAt: new Date(),
    category: 'knowledge',
  },
  {
    id: 'first-save',
    name: 'İlk Adım',
    description: 'İlk tasarrufunu yaptın',
    icon: '💰',
    unlockedAt: new Date(),
    category: 'saving',
  },
  {
    id: 'yolo-survivor',
    name: 'YOLO Hayatta Kalan',
    description: 'YOLO harcama tuzaklarını tanıdın',
    icon: '🏄',
    unlockedAt: new Date(),
    category: 'knowledge',
  },
  {
    id: 'doom-fighter',
    name: 'Doom Savaşçısı',
    description: 'Doom Spending döngüsünü kırdın',
    icon: '⚔️',
    unlockedAt: new Date(),
    category: 'resistance',
  },
  {
    id: 'latte-master',
    name: 'Latte Faktör Ustası',
    description: 'Mikro harcamaların gücünü fark ettin',
    icon: '☕',
    unlockedAt: new Date(),
    category: 'knowledge',
  },
  {
    id: 'level-3-master',
    name: 'Finansal Usta',
    description: 'Tüm seviyeleri tamamladın',
    icon: '👑',
    unlockedAt: new Date(),
    category: 'mastery',
  },
  {
    id: 'red-pill-taker',
    name: 'Kırmızı Hapı Alan',
    description: 'Gerçeği görmeye cesaret ettin',
    icon: '💊',
    unlockedAt: new Date(),
    category: 'knowledge',
  },
  {
    id: 'retirement-apprentice',
    name: 'Emeklilik Çırak',
    description: '₺50.000 birikim hedefi belirledin',
    icon: '🥉',
    unlockedAt: new Date(),
    category: 'retirement',
  },
  {
    id: 'retirement-journeyman',
    name: 'Emeklilik Kalfa',
    description: '₺250.000 birikime ulaştın',
    icon: '🥈',
    unlockedAt: new Date(),
    category: 'retirement',
  },
  {
    id: 'retirement-master',
    name: 'Emeklilik Usta',
    description: '₺750.000 birikime ulaştın',
    icon: '🥇',
    unlockedAt: new Date(),
    category: 'retirement',
  },
  {
    id: 'retirement-mentor',
    name: 'Emeklilik Mentor',
    description: '₺1.500.000 birikime ulaştın',
    icon: '💎',
    unlockedAt: new Date(),
    category: 'retirement',
  },
  {
    id: 'retirement-free',
    name: 'Finansal Özgür',
    description: '₺3.000.000+ birikimle özgürlüğe ulaştın',
    icon: '🦅',
    unlockedAt: new Date(),
    category: 'retirement',
  },
  {
    id: 'agent-smith-defeated',
    name: 'Ajan Smith Yenildi',
    description: 'Enflasyon ve faiz canavarını yendin',
    icon: '🕶️',
    unlockedAt: new Date(),
    category: 'mastery',
  },
];

const RETIREMENT_LEVELS: Record<RetirementLevel, { min: number; max: number; name: string }> = {
  apprentice: { min: 0, max: 50000, name: 'Çırak' },
  journeyman: { min: 50000, max: 250000, name: 'Kalfa' },
  master: { min: 250000, max: 750000, name: 'Usta' },
  mentor: { min: 750000, max: 1500000, name: 'Mentor' },
  free: { min: 1500000, max: Infinity, name: 'Özgür' },
};

export function useGameState() {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('matrixFinansUser');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  
  const [currentView, setCurrentView] = useState<'landing' | 'pill-choice' | 'awakening' | 'quiz' | 'level1' | 'level2' | 'level3' | 'boss' | 'future' | 'profile' | 'minigame' | 'retirement' | 'leaderboard'>('landing');
  const [theme, setTheme] = useState<'matrix' | 'light' | 'dark'>('matrix');

  useEffect(() => {
    localStorage.setItem('matrixFinansUser', JSON.stringify(user));
  }, [user]);

  const setUserName = useCallback((name: string) => {
    setUser(prev => ({ ...prev, name, id: Date.now().toString() }));
  }, []);

  const setCharacter = useCallback((character: UserCharacter) => {
    setUser(prev => ({ ...prev, character }));
  }, []);

  const setPillChoice = useCallback((pill: PillChoice) => {
    setUser(prev => ({ ...prev, pillChoice: pill }));
    if (pill === 'red') {
      unlockBadge('red-pill-taker');
    }
  }, []);

  const addQuizAnswer = useCallback((answer: QuizAnswer) => {
    setUser(prev => ({
      ...prev,
      quizAnswers: [...prev.quizAnswers, answer],
    }));
  }, []);

  const calculateCharacter = useCallback((): UserCharacter => {
    const scores: Record<string, number> = { yolo: 0, doom: 0, 'present-bias': 0, balanced: 0 };
    
    user.quizAnswers.forEach(answer => {
      if (answer.character) {
        scores[answer.character] = (scores[answer.character] || 0) + answer.score;
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const dominantCharacter = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as UserCharacter;
    
    return dominantCharacter || 'balanced';
  }, [user.quizAnswers]);

  const advanceLevel = useCallback(() => {
    setUser(prev => ({
      ...prev,
      level: Math.min(5, prev.level + 1) as GameLevel,
    }));
  }, []);

  const addXP = useCallback((amount: number) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      const newStage = Math.min(5, Math.floor(newXP / 100) + 1) as 1 | 2 | 3 | 4 | 5;
      return {
        ...prev,
        xp: newXP,
        avatarStage: newStage,
      };
    });
  }, []);

  const addCoins = useCallback((amount: number) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    const badge = BADGES.find(b => b.id === badgeId);
    if (badge && !user.badges.find(b => b.id === badgeId)) {
      setUser(prev => ({
        ...prev,
        badges: [...prev.badges, { ...badge, unlockedAt: new Date() }],
      }));
    }
  }, [user.badges]);

  const completeModule = useCallback((moduleId: string) => {
    if (!user.completedModules.includes(moduleId)) {
      setUser(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
    }
  }, [user.completedModules]);

  const getAvatarState = useCallback((): AvatarState => {
    const postureMap: Record<number, AvatarState['posture']> = {
      1: 'slouched',
      2: 'slouched',
      3: 'neutral',
      4: 'confident',
      5: 'hero',
    };

    const matrixNames: Record<number, string> = {
      1: 'The Unaware',
      2: 'The Seeker',
      3: 'The Awakened',
      4: 'The Resistor',
      5: 'The One',
    };

    return {
      stage: user.avatarStage,
      posture: postureMap[user.avatarStage],
      outfit: `level-${user.avatarStage}`,
      accessories: user.badges.map(b => b.icon),
      matrixName: matrixNames[user.avatarStage],
    };
  }, [user.avatarStage, user.badges]);

  // BES / Retirement System
  const contributeToRetirement = useCallback((amount: number) => {
    setUser(prev => {
      const governmentMatch = amount * 0.3; // 30% state contribution
      const newUserContribution = prev.retirement.userContribution + amount;
      const newGovContribution = prev.retirement.governmentContribution + governmentMatch;
      const newTotal = newUserContribution + newGovContribution + prev.retirement.fundReturn;
      
      // Determine level based on RETIREMENT_LEVELS
      let newLevel: RetirementLevel = 'apprentice';
      if (newTotal >= RETIREMENT_LEVELS.free.min) newLevel = 'free';
      else if (newTotal >= RETIREMENT_LEVELS.mentor.min) newLevel = 'mentor';
      else if (newTotal >= RETIREMENT_LEVELS.master.min) newLevel = 'master';
      else if (newTotal >= RETIREMENT_LEVELS.journeyman.min) newLevel = 'journeyman';

      // Unlock badges
      if (newLevel === 'journeyman' && prev.retirement.level !== 'journeyman') {
        unlockBadge('retirement-journeyman');
      }
      if (newLevel === 'master' && prev.retirement.level !== 'master') {
        unlockBadge('retirement-master');
      }
      if (newLevel === 'mentor' && prev.retirement.level !== 'mentor') {
        unlockBadge('retirement-mentor');
      }
      if (newLevel === 'free' && prev.retirement.level !== 'free') {
        unlockBadge('retirement-free');
      }

      return {
        ...prev,
        retirement: {
          ...prev.retirement,
          totalBalance: newTotal,
          userContribution: newUserContribution,
          governmentContribution: newGovContribution,
          level: newLevel,
        },
        totalSavings: prev.totalSavings + amount,
      };
    });
  }, [unlockBadge]);

  const calculateRetirementProjection = useCallback((): FutureSimulation => {
    const currentAge = user.age || 18;
    const retirementAge = 56; // Updated to Turkish BES standard (AgeSA)
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    
    const currentSavings = user.retirement.totalBalance;
    const monthlyContribution = user.retirement.monthlyContribution || 1000;
    
    // Annual return based on fund type
    let annualReturn = 0.10; // Balanced default
    if (user.retirement.fundType === 'safe') annualReturn = 0.05;
    else if (user.retirement.fundType === 'aggressive') annualReturn = 0.18;
    
    const futureValue = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement) +
      monthlyContribution * 12 * ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn);

    // Monthly pension (4% withdrawal rate)
    const monthlyPension = futureValue * 0.04 / 12;

    // Determine lifestyle
    let lifestyle: FutureSimulation['lifestyle'] = 'poor';
    if (monthlyPension >= 50000) lifestyle = 'luxury';
    else if (monthlyPension >= 25000) lifestyle = 'comfortable';
    else if (monthlyPension >= 10000) lifestyle = 'modest';

    // Determine health based on stress (fomoScore)
    let health: FutureSimulation['health'] = 'good';
    if (user.fomoScore > 70) health = 'poor';
    else if (user.fomoScore > 40) health = 'average';

    // Happiness score
    const happiness = Math.min(100, Math.max(0, 
      50 + (user.disciplineScore * 0.3) + (lifestyle === 'luxury' ? 30 : lifestyle === 'comfortable' ? 20 : 0)
    ));

    return {
      age: retirementAge,
      savings: Math.round(futureValue),
      monthlyPension: Math.round(monthlyPension),
      lifestyle,
      health,
      happiness,
      image: lifestyle === 'luxury' ? '🏖️' : lifestyle === 'comfortable' ? '🏠' : lifestyle === 'modest' ? '🏡' : '🏚️',
    };
  }, [user]);

  const updateFundType = useCallback((fundType: 'safe' | 'balanced' | 'aggressive') => {
    setUser(prev => ({
      ...prev,
      retirement: {
        ...prev.retirement,
        fundType,
      },
    }));
  }, []);

  const updateFOMO = useCallback((delta: number) => {
    setUser(prev => ({
      ...prev,
      fomoScore: Math.max(0, Math.min(100, prev.fomoScore + delta)),
    }));
  }, []);

  const updateDiscipline = useCallback((delta: number) => {
    setUser(prev => ({
      ...prev,
      disciplineScore: Math.max(0, Math.min(100, prev.disciplineScore + delta)),
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'matrix' ? 'dark' : 'matrix');
  }, []);

  const resetGame = useCallback(() => {
    setUser(INITIAL_USER);
    setCurrentView('landing');
    setTheme('matrix');
    localStorage.removeItem('matrixFinansUser');
  }, []);

  return {
    user,
    currentView,
    theme,
    setCurrentView,
    setUserName,
    setCharacter,
    setPillChoice,
    addQuizAnswer,
    calculateCharacter,
    advanceLevel,
    addXP,
    addCoins,
    unlockBadge,
    completeModule,
    getAvatarState,
    contributeToRetirement,
    calculateRetirementProjection,
    updateFundType,
    updateFOMO,
    updateDiscipline,
    toggleTheme,
    resetGame,
    BADGES,
    RETIREMENT_LEVELS,
  };
}
