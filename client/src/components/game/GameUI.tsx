import { useRoboGame } from '../../lib/stores/useRoboGame';
import { useAudio } from '../../lib/stores/useAudio';

export default function GameUI() {
  const { phase, score, lives, currentLevel, levelProgress } = useRoboGame();
  const { isMuted, toggleMute } = useAudio();

  if (phase !== 'playing') return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-40 p-4">
      {/* Top UI Bar */}
      <div className="flex justify-between items-center mb-4">
        {/* Left side - Score and Lives */}
        <div className="bg-black bg-opacity-60 rounded-lg px-4 py-2 text-white">
          <div className="flex items-center gap-4">
            <div className="text-lg font-bold">
              Score: {score}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">Lives:</span>
              {Array.from({ length: lives }, (_, i) => (
                <span key={i} className="text-red-500">❤️</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Sound toggle */}
        <button
          onClick={toggleMute}
          className="bg-black bg-opacity-60 rounded-lg px-3 py-2 text-white hover:bg-opacity-80 transition-all"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Level Info */}
      <div className="bg-black bg-opacity-60 rounded-lg px-4 py-2 text-white max-w-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">Level {currentLevel}</h3>
          <span className="text-sm">
            {levelProgress.collected}/{levelProgress.total} parts
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${levelProgress.total > 0 ? (levelProgress.collected / levelProgress.total) * 100 : 0}%`
            }}
          />
        </div>
        
        {/* Level description */}
        <p className="text-xs mt-2 text-gray-300">
          {currentLevel === 1 && "Collect sensors to help your robot see!"}
          {currentLevel === 2 && "Gather motors and gears for movement!"}
          {currentLevel === 3 && "Find batteries and wires to complete your robot!"}
        </p>
      </div>
      
      {/* STEMverse Footer */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-black bg-opacity-40 rounded px-2 py-1 text-xs text-gray-300">
          STEMverse
        </div>
      </div>
    </div>
  );
}
