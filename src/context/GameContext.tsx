import { createContext, useContext, type ReactNode } from 'react';
import { useGameState } from '@/hooks/useGameState';
import type { 
  User, 
  UserCharacter, 
  Badge, 
  QuizAnswer, 
  AvatarState, 
  PillChoice,
  RetirementLevel,
  FutureSimulation
} from '@/types';

interface GameContextType {
  user: User;
  currentView: 'landing' | 'pill-choice' | 'awakening' | 'quiz' | 'level1' | 'level2' | 'level3' | 'boss' | 'future' | 'profile' | 'minigame' | 'retirement' | 'leaderboard';
  theme: 'matrix' | 'light' | 'dark';
  setCurrentView: (view: 'landing' | 'pill-choice' | 'awakening' | 'quiz' | 'level1' | 'level2' | 'level3' | 'boss' | 'future' | 'profile' | 'minigame' | 'retirement' | 'leaderboard') => void;
  setUserName: (name: string) => void;
  setCharacter: (character: UserCharacter) => void;
  setPillChoice: (pill: PillChoice) => void;
  addQuizAnswer: (answer: QuizAnswer) => void;
  calculateCharacter: () => UserCharacter;
  advanceLevel: () => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  completeModule: (moduleId: string) => void;
  getAvatarState: () => AvatarState;
  contributeToRetirement: (amount: number) => void;
  calculateRetirementProjection: () => FutureSimulation;
  updateFundType: (fundType: 'safe' | 'balanced' | 'aggressive') => void;
  updateFOMO: (delta: number) => void;
  updateDiscipline: (delta: number) => void;
  toggleTheme: () => void;
  resetGame: () => void;
  BADGES: Badge[];
  RETIREMENT_LEVELS: Record<RetirementLevel, { min: number; max: number; name: string }>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState = useGameState();

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
