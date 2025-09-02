import { Collectible } from './Collectible';
import { Hazard } from './Hazard';

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export class Level {
  public levelNumber: number;
  public collectibles: Collectible[] = [];
  public hazards: Hazard[] = [];
  public platforms: Platform[] = [];
  private totalCollectibles: number = 0;

  constructor(levelNumber: number) {
    this.levelNumber = levelNumber;
    this.generateLevel();
  }

  private generateLevel() {
    // Clear existing objects
    this.collectibles = [];
    this.hazards = [];
    this.platforms = [];

    // Create ground platforms
    this.platforms.push({
      x: 0,
      y: 500,
      width: 800,
      height: 100,
      color: '#8B4513'
    });

    switch (this.levelNumber) {
      case 1:
        this.generateLevel1();
        break;
      case 2:
        this.generateLevel2();
        break;
      case 3:
        this.generateLevel3();
        break;
    }

    this.totalCollectibles = this.collectibles.length;
  }

  private generateLevel1() {
    // Level 1: Focus on sensors (easy layout)
    
    // Add platforms
    this.platforms.push(
      { x: 200, y: 400, width: 120, height: 20, color: '#A0522D' },
      { x: 400, y: 350, width: 120, height: 20, color: '#A0522D' },
      { x: 600, y: 300, width: 120, height: 20, color: '#A0522D' }
    );

    // Add sensors
    this.collectibles.push(
      new Collectible(250, 370, 'sensor'),
      new Collectible(450, 320, 'sensor'),
      new Collectible(650, 270, 'sensor'),
      new Collectible(100, 470, 'sensor'),
      new Collectible(700, 470, 'sensor')
    );

    // Add few hazards
    this.hazards.push(
      new Hazard(320, 470, 'circuit'),
      new Hazard(520, 470, 'oil')
    );
  }

  private generateLevel2() {
    // Level 2: Motors and gears (medium difficulty)
    
    // Add more complex platforms
    this.platforms.push(
      { x: 150, y: 420, width: 100, height: 20, color: '#A0522D' },
      { x: 300, y: 370, width: 80, height: 20, color: '#A0522D' },
      { x: 450, y: 320, width: 100, height: 20, color: '#A0522D' },
      { x: 600, y: 270, width: 80, height: 20, color: '#A0522D' },
      { x: 200, y: 220, width: 120, height: 20, color: '#A0522D' }
    );

    // Add motors and gears
    this.collectibles.push(
      new Collectible(180, 390, 'motor'),
      new Collectible(330, 340, 'gear'),
      new Collectible(480, 290, 'motor'),
      new Collectible(630, 240, 'gear'),
      new Collectible(230, 190, 'motor'),
      new Collectible(50, 470, 'gear')
    );

    // Add more hazards
    this.hazards.push(
      new Hazard(250, 470, 'circuit'),
      new Hazard(380, 470, 'tool'),
      new Hazard(520, 470, 'oil'),
      new Hazard(680, 470, 'circuit')
    );
  }

  private generateLevel3() {
    // Level 3: Batteries and all parts (harder layout)
    
    // Add challenging platforms
    this.platforms.push(
      { x: 120, y: 450, width: 80, height: 20, color: '#A0522D' },
      { x: 250, y: 400, width: 60, height: 20, color: '#A0522D' },
      { x: 350, y: 350, width: 80, height: 20, color: '#A0522D' },
      { x: 480, y: 300, width: 60, height: 20, color: '#A0522D' },
      { x: 580, y: 250, width: 80, height: 20, color: '#A0522D' },
      { x: 150, y: 200, width: 100, height: 20, color: '#A0522D' },
      { x: 400, y: 150, width: 80, height: 20, color: '#A0522D' }
    );

    // Add batteries and wires
    this.collectibles.push(
      new Collectible(150, 420, 'battery'),
      new Collectible(280, 370, 'wire'),
      new Collectible(380, 320, 'battery'),
      new Collectible(510, 270, 'wire'),
      new Collectible(610, 220, 'battery'),
      new Collectible(180, 170, 'wire'),
      new Collectible(430, 120, 'battery'),
      new Collectible(720, 470, 'wire')
    );

    // Add many hazards
    this.hazards.push(
      new Hazard(80, 470, 'circuit'),
      new Hazard(200, 470, 'oil'),
      new Hazard(320, 470, 'tool'),
      new Hazard(440, 470, 'circuit'),
      new Hazard(560, 470, 'oil'),
      new Hazard(680, 470, 'tool'),
      new Hazard(310, 320, 'circuit'),
      new Hazard(540, 220, 'oil')
    );
  }

  public getTotalCollectibles(): number {
    return this.totalCollectibles;
  }
}
