import { useRoboGame } from '../../lib/stores/useRoboGame';

export default function LevelComplete() {
  const { phase, currentLevel, score, nextLevel } = useRoboGame();

  if (phase !== 'levelComplete') return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-2xl text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Level {currentLevel} Complete!
        </h2>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-xl text-gray-800 mb-2">
            Score: {score}
          </p>
          <p className="text-gray-600">
            {currentLevel === 1 && "Great job collecting sensors! 📡"}
            {currentLevel === 2 && "Excellent work with motors and gears! ⚙️"}
            {currentLevel === 3 && "Amazing! You found all the batteries and wires! 🔋"}
          </p>
        </div>

        <div className="text-xs text-gray-400 mb-4">
          🎓 STEMverse Learning Progress
        </div>

        <button
          onClick={nextLevel}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
        >
          {currentLevel < 3 ? "Next Level! 🚀" : "Complete Robot! 🤖"}
        </button>
      </div>
    </div>
  );
}
