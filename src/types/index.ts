// Matrix: Finansal Uyanış - Tip Tanımları

export type UserCharacter = 'yolo' | 'doom' | 'present-bias' | 'balanced' | null;

export type GameLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type Theme = 'matrix' | 'light' | 'dark';

export type PillChoice = 'red' | 'blue' | null;

export type RetirementLevel = 'apprentice' | 'journeyman' | 'master' | 'mentor' | 'free';

export interface User {
  id: string;
  name: string;
  character: UserCharacter;
  level: GameLevel;
  xp: number;
  coins: number;
  avatarStage: 1 | 2 | 3 | 4 | 5;
  badges: Badge[];
  completedModules: string[];
  quizAnswers: QuizAnswer[];
  pillChoice: PillChoice;
  retirement: RetirementAccount;
  age: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  debt: number;
  fomoScore: number;
  disciplineScore: number;
}

export interface RetirementAccount {
  totalBalance: number;
  userContribution: number;
  governmentContribution: number;
  fundReturn: number;
  targetAmount: number;
  yearsToRetirement: number;
  monthlyContribution: number;
  level: RetirementLevel;
  fundType: 'safe' | 'balanced' | 'aggressive';
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
  character: UserCharacter;
  score: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'saving' | 'resistance' | 'knowledge' | 'mastery' | 'retirement';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    character: UserCharacter;
    score: number;
  }[];
}

export interface LearningModule {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'scenario' | 'interactive' | 'video';
  xpReward: number;
  coinReward: number;
  matrixCode?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  income: number;
  expenses: {
    category: string;
    amount: number;
    isNecessary: boolean;
  }[];
  unexpectedEvents: UnexpectedEvent[];
  matrixLocation: string;
}

export interface UnexpectedEvent {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: 'expense' | 'income';
  agentSmith?: boolean;
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  type: 'attention' | 'decision' | 'swipe' | 'boss';
  xpReward: number;
}

export interface AvatarState {
  stage: 1 | 2 | 3 | 4 | 5;
  posture: 'slouched' | 'neutral' | 'confident' | 'hero';
  outfit: string;
  accessories: string[];
  matrixName: string;
}

export interface AIResponse {
  message: string;
  mentorType: 'strict' | 'empathetic' | 'morpheus';
  suggestions?: string[];
}

export interface FinancialTrap {
  id: string;
  name: string;
  description: string;
  icon: string;
  examples: string[];
  solution: string;
  agentSmithTactic?: string;
}

export interface LatteFactorItem {
  id: string;
  name: string;
  dailyCost: number;
  yearlyCost: number;
  tenYearCost: number;
  alternative: string;
}

export interface Level3Challenge {
  id: string;
  title: string;
  description: string;
  options?: {
    id: string;
    text: string;
    risk: 'high' | 'very-high' | 'medium' | 'low';
    return: 'uncertain' | 'stable' | 'moderate' | 'potential-high';
  }[];
  correctAnswer?: number;
  explanation?: string;
}

export interface BossFight {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attacks: BossAttack[];
  weaknesses: string[];
  rewards: {
    xp: number;
    coins: number;
    badge?: string;
  };
}

export interface BossAttack {
  id: string;
  name: string;
  damage: number;
  description: string;
  counter: string;
}

export interface FutureSimulation {
  age: number;
  savings: number;
  monthlyPension: number;
  lifestyle: 'poor' | 'modest' | 'comfortable' | 'luxury';
  health: 'poor' | 'average' | 'good';
  happiness: number;
  image: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  totalSavings: number;
  level: string;
  badges: number;
  isCurrentUser?: boolean;
}

export interface SocialChallenge {
  id: string;
  title: string;
  description: string;
  duration: number;
  reward: number;
  participants: number;
  difficulty: 'easy' | 'medium' | 'hard';
}
