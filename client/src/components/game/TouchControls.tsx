import { useEffect, useRef } from 'react';
import { useRoboGame } from '../../lib/stores/useRoboGame';

export default function TouchControls() {
  const { phase, gameEngine } = useRoboGame();
  const touchStateRef = useRef({
    left: false,
    right: false,
    jump: false
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameEngine) return;
      
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          gameEngine.setInput('left', true);
          break;
        case 'KeyD':
        case 'ArrowRight':
          gameEngine.setInput('right', true);
          break;
        case 'Space':
        case 'KeyW':
        case 'ArrowUp':
          e.preventDefault();
          gameEngine.setInput('jump', true);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!gameEngine) return;
      
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          gameEngine.setInput('left', false);
          break;
        case 'KeyD':
        case 'ArrowRight':
          gameEngine.setInput('right', false);
          break;
        case 'Space':
        case 'KeyW':
        case 'ArrowUp':
          gameEngine.setInput('jump', false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameEngine]);

  const handleTouchStart = (action: 'left' | 'right' | 'jump') => {
    if (!gameEngine) return;
    
    touchStateRef.current[action] = true;
    gameEngine.setInput(action, true);
  };

  const handleTouchEnd = (action: 'left' | 'right' | 'jump') => {
    if (!gameEngine) return;
    
    touchStateRef.current[action] = false;
    gameEngine.setInput(action, false);
  };

  if (phase !== 'playing') return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 p-4">
      <div className="flex justify-between items-end">
        {/* Left controls */}
        <div className="flex gap-4">
          <button
            className="bg-blue-500 bg-opacity-80 text-white font-bold py-4 px-6 rounded-full text-2xl active:bg-blue-600 active:scale-95 transition-all select-none"
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouchStart('left');
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleTouchEnd('left');
            }}
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={() => handleTouchEnd('left')}
            onMouseLeave={() => handleTouchEnd('left')}
          >
            ←
          </button>
          
          <button
            className="bg-blue-500 bg-opacity-80 text-white font-bold py-4 px-6 rounded-full text-2xl active:bg-blue-600 active:scale-95 transition-all select-none"
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouchStart('right');
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleTouchEnd('right');
            }}
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={() => handleTouchEnd('right')}
            onMouseLeave={() => handleTouchEnd('right')}
          >
            →
          </button>
        </div>

        {/* Jump button */}
        <button
          className="bg-green-500 bg-opacity-80 text-white font-bold py-4 px-6 rounded-full text-xl active:bg-green-600 active:scale-95 transition-all select-none"
          onTouchStart={(e) => {
            e.preventDefault();
            handleTouchStart('jump');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTouchEnd('jump');
          }}
          onMouseDown={() => handleTouchStart('jump')}
          onMouseUp={() => handleTouchEnd('jump')}
          onMouseLeave={() => handleTouchEnd('jump')}
        >
          JUMP
        </button>
      </div>
    </div>
  );
}
