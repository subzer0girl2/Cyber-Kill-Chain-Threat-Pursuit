
import React, { useState, useCallback } from 'react';
import { GameState } from './types';
import { CYBER_KILL_CHAIN } from './constants';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [score, setScore] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [lives, setLives] = useState(3);

  const startGame = useCallback(() => {
    setScore(0);
    setCurrentPhaseIndex(0);
    setLives(3);
    setGameState(GameState.Playing);
  }, []);

  const handleCorrectAnswer = useCallback(() => {
    setScore(prev => prev + 100);
    const nextPhaseIndex = currentPhaseIndex + 1;
    if (nextPhaseIndex < CYBER_KILL_CHAIN.length) {
      setCurrentPhaseIndex(nextPhaseIndex);
    } else {
      setGameState(GameState.End);
    }
  }, [currentPhaseIndex]);

  const handleIncorrectAnswer = useCallback(() => {
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) {
      setGameState(GameState.End);
      return;
    }
    
    const nextPhaseIndex = currentPhaseIndex + 1;
    if (nextPhaseIndex < CYBER_KILL_CHAIN.length) {
      setCurrentPhaseIndex(nextPhaseIndex);
    } else {
      setGameState(GameState.End);
    }
  }, [currentPhaseIndex, lives]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={startGame} />;
      case GameState.Playing:
        return (
          <GameScreen
            phaseData={CYBER_KILL_CHAIN[currentPhaseIndex]}
            onCorrectAnswer={handleCorrectAnswer}
            onIncorrectAnswer={handleIncorrectAnswer}
            lives={lives}
            score={score}
            phaseNumber={currentPhaseIndex + 1}
            totalPhases={CYBER_KILL_CHAIN.length}
          />
        );
      case GameState.End:
        return <EndScreen score={score} onRestart={startGame} success={lives > 0} />;
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
