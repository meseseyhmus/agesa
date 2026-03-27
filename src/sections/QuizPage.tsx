import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { quizQuestions, characterDescriptions } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';
import { MatrixCard } from '@/components/MatrixCard';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function QuizPage() {
  const { 
    addQuizAnswer, 
    calculateCharacter, 
    setCharacter, 
    setCurrentView,
  } = useGame();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [calculatedCharacter, setCalculatedCharacter] = useState<string | null>(null);

  const handleAnswer = (option: typeof quizQuestions[0]['options'][0]) => {
    addQuizAnswer({
      questionId: quizQuestions[currentQuestion].id,
      answer: option.id,
      character: option.character,
      score: option.score,
    });

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const character = calculateCharacter();
      setCalculatedCharacter(character);
      setCharacter(character);
      setShowResult(true);
    }
  };

  const handleContinue = () => {
    setCurrentView('level1');
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult && calculatedCharacter) {
    const character = characterDescriptions[calculatedCharacter];
    
    return (
      <div className="min-h-screen bg-[#0D0208] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <MatrixCard className="p-8 overflow-hidden" glowColor={calculatedCharacter === 'balanced' ? 'green' : 'red'}>
            <div className={`h-1 absolute top-0 left-0 right-0 ${
              calculatedCharacter === 'yolo' ? 'bg-[#FF00FF]' :
              calculatedCharacter === 'doom' ? 'bg-[#666666]' :
              calculatedCharacter === 'present-bias' ? 'bg-[#FF8800]' :
              'bg-[#00FF41]'
            }`} />
            
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF41]/20 rounded-full mb-4 border border-[#00FF41]"
              >
                <Sparkles className="w-10 h-10 text-[#00FF41]" />
              </motion.div>
              <h2 className="text-3xl font-bold text-[#00FF41] mb-2">
                Harcama Karakterin:
              </h2>
              <h3 className={`text-2xl font-bold ${
                calculatedCharacter === 'yolo' ? 'text-[#FF00FF]' :
                calculatedCharacter === 'doom' ? 'text-[#888888]' :
                calculatedCharacter === 'present-bias' ? 'text-[#FF8800]' :
                'text-[#00FF41]'
              }`}>
                {character.title}
              </h3>
            </div>

            <div className="bg-[#001400] border border-[#00FF41]/30 rounded-xl p-6 mb-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                {character.description}
              </p>
              <div className="border-t border-[#00FF41]/30 pt-4">
                <p className="text-[#00FF41] font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Öneri:
                </p>
                <p className="text-gray-300 mt-1">{character.advice}</p>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={handleContinue}
              className="w-full bg-[#00FF41] text-black hover:bg-[#00CC33] py-6 text-lg font-bold"
            >
              Eğitime Başla
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </MatrixCard>
        </motion.div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0D0208] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Soru {currentQuestion + 1} / {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#001400]" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <MatrixCard className="p-8">
              <h2 className="text-2xl font-bold text-[#00FF41] mb-8">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-xl bg-[#001400] hover:bg-[#00FF41]/10 border border-[#00FF41]/30 hover:border-[#00FF41] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-[#00FF41]/20 group-hover:bg-[#00FF41]/30 flex items-center justify-center text-[#00FF41] font-medium">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-white">{option.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </MatrixCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
