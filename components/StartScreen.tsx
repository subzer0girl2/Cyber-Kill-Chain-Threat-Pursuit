
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 border-2 border-green-500/50 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg shadow-green-500/20">
      <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4" style={{ textShadow: '0 0 10px #00ff41' }}>
        Cyber Kill Chain: Threat Pursuit
      </h1>
      <p className="text-lg text-green-300/80 mb-8 max-w-2xl mx-auto">
        You are a Tier 1 Analyst at a Security Operations Center. An active threat has been detected. Your mission is to analyze the attacker's behavior at each stage of the Cyber Kill Chain and correctly identify their techniques. The fate of the network is in your hands.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-3 bg-green-500/20 text-green-400 border-2 border-green-500 rounded-md text-xl font-bold
                   hover:bg-green-500/40 hover:text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
      >
        Begin Analysis
      </button>
    </div>
  );
};

export default StartScreen;
