import { Player } from './Player';
import { Level } from './Level';
import { Physics } from './Physics';
import { Renderer } from './Renderer';
import { Collectible } from './Collectible';
import { Hazard } from './Hazard';
import { useAudio } from '../stores/useAudio';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private currentLevel: Level;
  private physics: Physics;
  private renderer: Renderer;
  private isRunning: boolean = false;
  private lastTime: number = 0;
  private gameStore: any;

  // Input state
  public inputState = {
    left: false,
    right: false,
    jump: false
  };

  constructor(canvas: HTMLCanvasElement, gameStore: any) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.gameStore = gameStore;
    
    this.physics = new Physics();
    this.renderer = new Renderer(this.ctx);
    
    // Initialize player
    this.player = new Player(100, 400);
    
    // Initialize first level
    this.currentLevel = new Level(1);
    
    this.setupCanvas();
    this.start();
  }

  private setupCanvas() {
    const updateCanvasSize = () => {
      const container = this.canvas.parentElement!;
      const rect = container.getBoundingClientRect();
      
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      
      // Update renderer with new dimensions
      this.renderer.setDimensions(this.canvas.width, this.canvas.height);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
  }

  public start() {
    this.isRunning = true;
    this.gameLoop(0);
  }

  public stop() {
    this.isRunning = false;
  }

  public restart() {
    this.player = new Player(100, 400);
    this.currentLevel = new Level(1);
    this.updateLevelProgress();
  }

  public loadLevel(levelNumber: number) {
    this.currentLevel = new Level(levelNumber);
    this.player.reset(100, 400);
    this.updateLevelProgress();
  }

  private gameLoop = (currentTime: number) => {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number) {
    // Update player
    this.player.update(deltaTime, this.inputState);
    
    // Apply physics
    this.physics.updatePlayer(this.player, this.currentLevel.platforms);
    
    // Check collectible collisions
    this.currentLevel.collectibles.forEach((collectible, index) => {
      if (this.physics.checkCollision(this.player, collectible)) {
        // Collect item
        this.gameStore.getState().updateScore(10);
        this.gameStore.getState().showFact(collectible.fact, collectible.emoji);
        
        // Play success sound
        useAudio.getState().playSuccess();
        
        // Remove collectible
        this.currentLevel.collectibles.splice(index, 1);
        this.updateLevelProgress();
      }
    });
    
    // Check hazard collisions
    this.currentLevel.hazards.forEach((hazard) => {
      if (this.physics.checkCollision(this.player, hazard)) {
        if (!hazard.hasHit) {
          this.gameStore.getState().updateScore(-5);
          
          // Play hit sound
          useAudio.getState().playHit();
          
          hazard.hasHit = true;
          
          // Reset hit flag after a short delay
          setTimeout(() => {
            hazard.hasHit = false;
          }, 1000);
        }
      }
    });
    
    // Check if player fell off screen
    if (this.player.y > this.canvas.height + 100) {
      this.gameStore.getState().loseLife();
      this.player.reset(100, 400);
    }
  }

  private render() {
    // Clear canvas
    this.renderer.clear();
    
    // Render background
    this.renderer.renderBackground();
    
    // Render level
    this.renderer.renderLevel(this.currentLevel);
    
    // Render player
    this.renderer.renderPlayer(this.player);
    
    // Debug logging
    if (Math.random() < 0.01) { // Log only occasionally to avoid spam
      console.log(`Player position: (${this.player.x}, ${this.player.y}), Canvas: ${this.canvas.width}x${this.canvas.height}`);
    }
  }

  private updateLevelProgress() {
    const collected = this.currentLevel.getTotalCollectibles() - this.currentLevel.collectibles.length;
    const total = this.currentLevel.getTotalCollectibles();
    this.gameStore.getState().updateLevelProgress(collected, total);
  }

  // Input methods
  public setInput(key: 'left' | 'right' | 'jump', pressed: boolean) {
    this.inputState[key] = pressed;
    if (pressed) {
      console.log(`Input: ${key} pressed, Player at (${this.player.x}, ${this.player.y})`);
    }
  }
}
