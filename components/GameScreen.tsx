
import React, { useState, useEffect, useCallback } from 'react';
import { KillChainPhase, Technique } from '../types';
import { generateScenario } from '../services/geminiService';
import { ShieldIcon, HeartIcon } from './Icons';

interface GameScreenProps {
  phaseData: KillChainPhase;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  lives: number;
  score: number;
  phaseNumber: number;
  totalPhases: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const GameScreen: React.FC<GameScreenProps> = ({ phaseData, onCorrectAnswer, onIncorrectAnswer, lives, score, phaseNumber, totalPhases }) => {
  const [scenario, setScenario] = useState<string>('');
  const [options, setOptions] = useState<Technique[]>([]);
  const [correctTechnique, setCorrectTechnique] = useState<Technique | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const loadPhase = useCallback(async () => {
    setIsLoading(true);
    setScenario('');
    setOptions([]);
    setSelectedAnswerId(null);
    setIsAnswered(false);

    const techniques = phaseData.techniques;
    const correctTech = techniques[Math.floor(Math.random() * techniques.length)];
    setCorrectTechnique(correctTech);

    const otherTechniques = techniques.filter(t => t.id !== correctTech.id);
    const shuffledDistractors = shuffleArray(otherTechniques).slice(0, 2);
    const currentOptions = shuffleArray([correctTech, ...shuffledDistractors]);
    
    setOptions(currentOptions);
    
    const generatedScenario = await generateScenario(phaseData.name, correctTech.name);
    setScenario(generatedScenario);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseData]);

  useEffect(() => {
    loadPhase();
  }, [loadPhase]);

  const handleAnswer = (technique: Technique) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswerId(technique.id);

    const isCorrect = technique.id === correctTechnique?.id;

    setTimeout(() => {
      if (isCorrect) {
        onCorrectAnswer();
      } else {
        onIncorrectAnswer();
      }
    }, 2000);
  };
  
  const getButtonClass = (technique: Technique) => {
    if (!isAnswered) {
      return "border-cyan-400/50 hover:bg-cyan-400/20 hover:border-cyan-400";
    }
    if (technique.id === correctTechnique?.id) {
      return "bg-green-500/30 border-green-500 animate-pulse";
    }
    if (technique.id === selectedAnswerId) {
      return "bg-red-500/30 border-red-500";
    }
    return "border-gray-600/50 text-gray-500";
  }


  return (
    <div className="p-6 border-2 border-cyan-500/50 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg shadow-cyan-500/20 w-full">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-cyan-500/30">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300">Phase {phaseNumber}/{totalPhases}: {phaseData.name}</h2>
          <p className="text-cyan-200/80 text-sm">{phaseData.description}</p>
        </div>
        <div className="flex space-x-6 text-xl">
          <div className="flex items-center space-x-2">
            <ShieldIcon className="h-6 w-6 text-green-400"/>
            <span className="font-bold text-green-400">{score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <HeartIcon className="h-6 w-6 text-red-500"/>
            <span className="font-bold text-red-500">{lives}</span>
          </div>
        </div>
      </div>
      
      <div className="my-6 min-h-[100px] p-4 bg-gray-900/50 border border-gray-700 rounded-md">
        <h3 className="text-lg font-bold text-gray-400 mb-2">[INCOMING INTEL]</h3>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <p className="text-cyan-300">Analyzing threat patterns...</p>
          </div>
        ) : (
          <p className="text-cyan-200 text-lg whitespace-pre-wrap">{scenario}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((tech) => (
          <button
            key={tech.id}
            onClick={() => handleAnswer(tech)}
            disabled={isAnswered || isLoading}
            className={`p-4 border-2 rounded-lg text-left transition-all duration-300 disabled:cursor-not-allowed ${getButtonClass(tech)}`}
          >
            <h4 className="font-bold text-lg">{tech.name}</h4>
            <p className="text-sm opacity-80">{tech.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
