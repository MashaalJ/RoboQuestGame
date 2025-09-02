import { useRoboGame } from '../../lib/stores/useRoboGame';

export default function EducationalPopup() {
  const { showEducationalPopup, currentFact, currentFactEmoji, hideFact } = useRoboGame();

  if (!showEducationalPopup) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-2xl transform animate-bounce">
        <div className="text-center">
          <div className="text-6xl mb-4">{currentFactEmoji}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Robot Part Collected!
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {currentFact}
          </p>
          <div className="text-xs text-gray-400 mb-4 border-t pt-3">
            Educational content by STEMverse
          </div>
          <button
            onClick={hideFact}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            Cool! Keep Learning 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
