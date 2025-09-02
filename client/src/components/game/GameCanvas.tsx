import { useEffect, useRef } from 'react';
import { useRoboGame } from '../../lib/stores/useRoboGame';
import { GameEngine } from '../../lib/game/GameEngine';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const { phase, currentLevel, setGameEngine } = useRoboGame();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize game engine
    if (!gameEngineRef.current && phase === 'playing') {
      gameEngineRef.current = new GameEngine(canvasRef.current, useRoboGame);
      setGameEngine(gameEngineRef.current);
      console.log('Game engine initialized');
    }

    // Handle level changes
    if (gameEngineRef.current && phase === 'playing') {
      gameEngineRef.current.loadLevel(currentLevel);
    }

    // Clean up when game stops
    if (phase === 'menu' && gameEngineRef.current) {
      gameEngineRef.current.stop();
      gameEngineRef.current = null;
    }

    return () => {
      if (gameEngineRef.current) {
        gameEngineRef.current.stop();
      }
    };
  }, [phase, currentLevel, setGameEngine]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ 
          imageRendering: 'pixelated',
          touchAction: 'none'
        }}
      />
    </div>
  );
}
