import { GameProvider } from '@/context/GameContext';
import { useGame } from '@/context/GameContext';
import { MatrixRain } from '@/components/MatrixRain';
import { NavigationBar } from '@/components/NavigationBar';
import { LandingPage } from '@/sections/LandingPage';
import { PillChoicePage } from '@/sections/PillChoicePage';
import { AwakeningPage } from '@/sections/AwakeningPage';
import { QuizPage } from '@/sections/QuizPage';
import { Level1Page } from '@/sections/Level1Page';
import { Level2Page } from '@/sections/Level2Page';
import { Level3Page } from '@/sections/Level3Page';
import { BossFightPage } from '@/sections/BossFightPage';
import { FutureSimulationPage } from '@/sections/FutureSimulationPage';
import { RetirementPage } from '@/sections/RetirementPage';
import { MiniGamesPage } from '@/sections/MiniGamesPage';
import { ProfilePage } from '@/sections/ProfilePage';
import { LeaderboardPage } from '@/sections/LeaderboardPage';
import { Toaster } from '@/components/ui/sonner';

function AppContent() {
  const { currentView, theme } = useGame();

  const showMatrixRain = ['landing', 'pill-choice', 'awakening', 'quiz', 'boss'].includes(currentView);
  const showNavBar = !['pill-choice', 'awakening'].includes(currentView);

  return (
    <div className={theme}>
      {showMatrixRain && <MatrixRain opacity={0.08} speed={0.8} />}
      
      <div className={showNavBar ? 'pl-[72px]' : ''}>
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'pill-choice' && <PillChoicePage />}
        {currentView === 'awakening' && <AwakeningPage />}
        {currentView === 'quiz' && <QuizPage />}
        {currentView === 'level1' && <Level1Page />}
        {currentView === 'level2' && <Level2Page />}
        {currentView === 'level3' && <Level3Page />}
        {currentView === 'boss' && <BossFightPage />}
        {currentView === 'future' && <FutureSimulationPage />}
        {currentView === 'retirement' && <RetirementPage />}
        {currentView === 'minigame' && <MiniGamesPage />}
        {currentView === 'profile' && <ProfilePage />}
        {currentView === 'leaderboard' && <LeaderboardPage />}
      </div>

      {showNavBar && <NavigationBar />}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
      <Toaster />
    </GameProvider>
  );
}

export default App;
