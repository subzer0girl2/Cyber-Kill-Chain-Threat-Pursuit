
import React from 'react';

interface EndScreenProps {
  score: number;
  onRestart: () => void;
  success: boolean;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart, success }) => {
  const title = success ? "Threat Neutralized" : "System Compromised";
  const message = success 
    ? "Excellent work, Analyst. Your quick identification of the threat vector prevented a major breach. The network is secure."
    : "The adversary slipped through our defenses. We'll get them next time. Review the after-action report and prepare for redeployment.";
  const colorClass = success ? "green" : "red";

  return (
    <div className={`text-center p-8 border-2 border-${colorClass}-500/50 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg shadow-${colorClass}-500/20`}>
      <h1 className={`text-4xl md:text-5xl font-bold text-${colorClass}-400 mb-4`} style={{ textShadow: `0 0 10px var(--tw-shadow-color)` }}>
        {title}
      </h1>
      <p className={`text-2xl text-${colorClass}-300 mb-4`}>
        Final Score: {score}
      </p>
      <p className={`text-lg text-${colorClass}-300/80 mb-8 max-w-2xl mx-auto`}>
        {message}
      </p>
      <button
        onClick={onRestart}
        className={`px-8 py-3 bg-${colorClass}-500/20 text-${colorClass}-400 border-2 border-${colorClass}-500 rounded-md text-xl font-bold
                   hover:bg-${colorClass}-500/40 hover:text-white hover:shadow-lg hover:shadow-${colorClass}-500/50 transition-all duration-300`}
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;
