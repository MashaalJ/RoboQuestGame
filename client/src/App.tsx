import { useEffect } from "react";
import GameCanvas from "./components/game/GameCanvas";
import GameUI from "./components/game/GameUI";
import TouchControls from "./components/game/TouchControls";
import EducationalPopup from "./components/game/EducationalPopup";
import LevelComplete from "./components/game/LevelComplete";
import { useRoboGame } from "./lib/stores/useRoboGame";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { phase, score, initializeGame } = useRoboGame();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize audio
    const backgroundMusic = new Audio("/sounds/background.mp3");
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    
    setBackgroundMusic(backgroundMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);
    
    // Initialize game
    initializeGame();
  }, [initializeGame, setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden relative">
      {/* Game Canvas */}
      <GameCanvas />
      
      {/* Game UI Overlay */}
      <GameUI />
      
      {/* Touch Controls */}
      <TouchControls />
      
      {/* Educational Popup */}
      <EducationalPopup />
      
      {/* Level Complete Screen */}
      <LevelComplete />
      
      {/* Start Screen */}
      {phase === "menu" && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="text-center p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              🤖 RoboQuest
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-300 mb-8">
              Intro to Robotics
            </h2>
            <button
              onClick={() => useRoboGame.getState().startGame()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              Start Learning! 🚀
            </button>
            <p className="text-gray-300 mt-4 text-sm">
              Collect robot parts and learn about robotics!
            </p>
          </div>
        </div>
      )}
      
      {/* Game Over Screen */}
      {phase === "gameOver" && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="text-center p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
              🎉 Congratulations!
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-4">
              Your robot is complete!
            </h2>
            <p className="text-lg text-blue-300 mb-8">
              Intro to Robotics unlocked!
            </p>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
              <p className="text-white text-xl">Final Score: {score}</p>
            </div>
            <button
              onClick={() => useRoboGame.getState().restartGame()}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
            >
              Play Again! 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
