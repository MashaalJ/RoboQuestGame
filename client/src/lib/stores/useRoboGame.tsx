import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameEngine } from "../game/GameEngine";

export type GamePhase = "menu" | "playing" | "paused" | "levelComplete" | "gameOver";
export type GameLevel = 1 | 2 | 3;

export interface CollectibleType {
  id: string;
  type: 'sensor' | 'motor' | 'wire' | 'gear' | 'battery';
  fact: string;
  emoji: string;
}

export interface GameState {
  phase: GamePhase;
  currentLevel: GameLevel;
  score: number;
  lives: number;
  gameEngine: GameEngine | null;
  showEducationalPopup: boolean;
  currentFact: string;
  currentFactEmoji: string;
  levelProgress: {
    collected: number;
    total: number;
  };
  collectedItemTypes: Set<string>;
}

interface RoboGameStore extends GameState {
  // Actions
  initializeGame: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  nextLevel: () => void;
  completeGame: () => void;
  updateScore: (points: number) => void;
  loseLife: () => void;
  showFact: (fact: string, emoji: string, itemType: string) => void;
  hideFact: () => void;
  updateLevelProgress: (collected: number, total: number) => void;
  setGameEngine: (engine: GameEngine) => void;
}

export const useRoboGame = create<RoboGameStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    phase: "menu",
    currentLevel: 1,
    score: 0,
    lives: 3,
    gameEngine: null,
    showEducationalPopup: false,
    currentFact: "",
    currentFactEmoji: "",
    levelProgress: {
      collected: 0,
      total: 0,
    },
    collectedItemTypes: new Set(),

    // Actions
    initializeGame: () => {
      console.log("Initializing RoboQuest game");
    },

    startGame: () => {
      set((state) => ({
        phase: "playing",
        currentLevel: 1,
        score: 0,
        lives: 3,
        levelProgress: { collected: 0, total: 0 }
      }));
    },

    pauseGame: () => {
      set({ phase: "paused" });
    },

    resumeGame: () => {
      set({ phase: "playing" });
    },

    restartGame: () => {
      const { gameEngine } = get();
      if (gameEngine) {
        gameEngine.restart();
      }
      set({
        phase: "playing",
        currentLevel: 1,
        score: 0,
        lives: 3,
        showEducationalPopup: false,
        currentFact: "",
        currentFactEmoji: "",
        levelProgress: { collected: 0, total: 0 },
        collectedItemTypes: new Set()
      });
    },

    nextLevel: () => {
      const { currentLevel } = get();
      if (currentLevel < 3) {
        set((state) => ({
          currentLevel: (state.currentLevel + 1) as GameLevel,
          phase: "playing",
          levelProgress: { collected: 0, total: 0 }
        }));
      } else {
        get().completeGame();
      }
    },

    completeGame: () => {
      set({ phase: "gameOver" });
    },

    updateScore: (points: number) => {
      set((state) => ({
        score: Math.max(0, state.score + points)
      }));
    },

    loseLife: () => {
      set((state) => {
        const newLives = state.lives - 1;
        if (newLives <= 0) {
          return { lives: 0, phase: "gameOver" };
        }
        return { lives: newLives };
      });
    },

    showFact: (fact: string, emoji: string, itemType: string) => {
      const { collectedItemTypes } = get();
      
      // Only show popup if this is the first time collecting this type
      if (!collectedItemTypes.has(itemType)) {
        set((state) => ({
          showEducationalPopup: true,
          currentFact: fact,
          currentFactEmoji: emoji,
          collectedItemTypes: new Set([...Array.from(state.collectedItemTypes), itemType])
        }));
      }
    },

    hideFact: () => {
      set({
        showEducationalPopup: false,
        currentFact: "",
        currentFactEmoji: ""
      });
    },

    updateLevelProgress: (collected: number, total: number) => {
      set({
        levelProgress: { collected, total }
      });
      
      if (collected >= total) {
        setTimeout(() => {
          set({ phase: "levelComplete" });
        }, 1000);
      }
    },

    setGameEngine: (engine: GameEngine) => {
      set({ gameEngine: engine });
    }
  }))
);
