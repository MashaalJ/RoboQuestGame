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

    // Create much wider ground platforms for scrolling world
    this.platforms.push({
      x: 0,
      y: 500,
      width: 2000,
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
    // Level 1: Focus on sensors (easy layout) - spread across wider world
    
    // Add platforms across the wider world
    this.platforms.push(
      { x: 200, y: 400, width: 120, height: 20, color: '#A0522D' },
      { x: 400, y: 350, width: 120, height: 20, color: '#A0522D' },
      { x: 600, y: 300, width: 120, height: 20, color: '#A0522D' },
      { x: 800, y: 280, width: 120, height: 20, color: '#A0522D' },
      { x: 1000, y: 320, width: 120, height: 20, color: '#A0522D' },
      { x: 1200, y: 380, width: 120, height: 20, color: '#A0522D' },
      { x: 1400, y: 300, width: 120, height: 20, color: '#A0522D' },
      { x: 1600, y: 350, width: 120, height: 20, color: '#A0522D' }
    );

    // Add many more sensors spread across the world
    this.collectibles.push(
      new Collectible(300, 470, 'sensor'),
      new Collectible(250, 370, 'sensor'),
      new Collectible(450, 320, 'sensor'),
      new Collectible(650, 270, 'sensor'),
      new Collectible(850, 250, 'sensor'),
      new Collectible(1050, 290, 'sensor'),
      new Collectible(1250, 350, 'sensor'),
      new Collectible(1450, 270, 'sensor'),
      new Collectible(1650, 320, 'sensor'),
      new Collectible(1800, 470, 'sensor')
    );

    // Add hazards spread across the world
    this.hazards.push(
      new Hazard(320, 470, 'circuit'),
      new Hazard(520, 470, 'oil'),
      new Hazard(720, 470, 'circuit'),
      new Hazard(920, 470, 'tool'),
      new Hazard(1120, 470, 'oil'),
      new Hazard(1320, 470, 'circuit'),
      new Hazard(1520, 470, 'tool')
    );
  }

  private generateLevel2() {
    // Level 2: Motors and gears (medium difficulty) - wider world
    
    // Add more complex platforms across wider world
    this.platforms.push(
      { x: 150, y: 420, width: 100, height: 20, color: '#A0522D' },
      { x: 300, y: 370, width: 80, height: 20, color: '#A0522D' },
      { x: 450, y: 320, width: 100, height: 20, color: '#A0522D' },
      { x: 600, y: 270, width: 80, height: 20, color: '#A0522D' },
      { x: 200, y: 220, width: 120, height: 20, color: '#A0522D' },
      { x: 750, y: 300, width: 100, height: 20, color: '#A0522D' },
      { x: 900, y: 380, width: 80, height: 20, color: '#A0522D' },
      { x: 1050, y: 250, width: 120, height: 20, color: '#A0522D' },
      { x: 1200, y: 330, width: 100, height: 20, color: '#A0522D' },
      { x: 1350, y: 280, width: 80, height: 20, color: '#A0522D' },
      { x: 1500, y: 380, width: 120, height: 20, color: '#A0522D' },
      { x: 1700, y: 250, width: 100, height: 20, color: '#A0522D' }
    );

    // Add motors and gears across the wider world
    this.collectibles.push(
      new Collectible(300, 470, 'gear'),
      new Collectible(180, 390, 'motor'),
      new Collectible(330, 340, 'gear'),
      new Collectible(480, 290, 'motor'),
      new Collectible(630, 240, 'gear'),
      new Collectible(230, 190, 'motor'),
      new Collectible(780, 270, 'gear'),
      new Collectible(930, 350, 'motor'),
      new Collectible(1080, 220, 'gear'),
      new Collectible(1230, 300, 'motor'),
      new Collectible(1380, 250, 'gear'),
      new Collectible(1530, 350, 'motor'),
      new Collectible(1730, 220, 'gear'),
      new Collectible(1850, 470, 'motor')
    );

    // Add more hazards across the world
    this.hazards.push(
      new Hazard(250, 470, 'circuit'),
      new Hazard(380, 470, 'tool'),
      new Hazard(520, 470, 'oil'),
      new Hazard(680, 470, 'circuit'),
      new Hazard(820, 470, 'tool'),
      new Hazard(980, 470, 'oil'),
      new Hazard(1120, 470, 'circuit'),
      new Hazard(1280, 470, 'tool'),
      new Hazard(1420, 470, 'oil'),
      new Hazard(1580, 470, 'circuit'),
      new Hazard(1720, 470, 'tool')
    );
  }

  private generateLevel3() {
    // Level 3: Batteries and wires (harder layout) - widest world
    
    // Add challenging platforms across the widest world
    this.platforms.push(
      { x: 120, y: 450, width: 80, height: 20, color: '#A0522D' },
      { x: 250, y: 400, width: 60, height: 20, color: '#A0522D' },
      { x: 350, y: 350, width: 80, height: 20, color: '#A0522D' },
      { x: 480, y: 300, width: 60, height: 20, color: '#A0522D' },
      { x: 580, y: 250, width: 80, height: 20, color: '#A0522D' },
      { x: 150, y: 200, width: 100, height: 20, color: '#A0522D' },
      { x: 400, y: 150, width: 80, height: 20, color: '#A0522D' },
      { x: 700, y: 380, width: 60, height: 20, color: '#A0522D' },
      { x: 820, y: 280, width: 80, height: 20, color: '#A0522D' },
      { x: 950, y: 340, width: 60, height: 20, color: '#A0522D' },
      { x: 1080, y: 220, width: 80, height: 20, color: '#A0522D' },
      { x: 1200, y: 360, width: 100, height: 20, color: '#A0522D' },
      { x: 1350, y: 180, width: 80, height: 20, color: '#A0522D' },
      { x: 1500, y: 320, width: 60, height: 20, color: '#A0522D' },
      { x: 1650, y: 260, width: 80, height: 20, color: '#A0522D' },
      { x: 1780, y: 380, width: 100, height: 20, color: '#A0522D' }
    );

    // Add batteries and wires across the wider world
    this.collectibles.push(
      new Collectible(300, 470, 'wire'),
      new Collectible(150, 420, 'battery'),
      new Collectible(280, 370, 'wire'),
      new Collectible(380, 320, 'battery'),
      new Collectible(510, 270, 'wire'),
      new Collectible(610, 220, 'battery'),
      new Collectible(180, 170, 'wire'),
      new Collectible(430, 120, 'battery'),
      new Collectible(720, 470, 'wire'),
      new Collectible(730, 350, 'battery'),
      new Collectible(850, 250, 'wire'),
      new Collectible(980, 310, 'battery'),
      new Collectible(1110, 190, 'wire'),
      new Collectible(1230, 330, 'battery'),
      new Collectible(1380, 150, 'wire'),
      new Collectible(1530, 290, 'battery'),
      new Collectible(1680, 230, 'wire'),
      new Collectible(1810, 350, 'battery'),
      new Collectible(1900, 470, 'wire')
    );

    // Add many hazards across the wide world
    this.hazards.push(
      new Hazard(200, 470, 'oil'),
      new Hazard(320, 470, 'tool'),
      new Hazard(440, 470, 'circuit'),
      new Hazard(560, 470, 'oil'),
      new Hazard(680, 470, 'tool'),
      new Hazard(800, 470, 'circuit'),
      new Hazard(920, 470, 'oil'),
      new Hazard(1040, 470, 'tool'),
      new Hazard(1160, 470, 'circuit'),
      new Hazard(1280, 470, 'oil'),
      new Hazard(1400, 470, 'tool'),
      new Hazard(1520, 470, 'circuit'),
      new Hazard(1640, 470, 'oil'),
      new Hazard(1760, 470, 'tool'),
      new Hazard(310, 320, 'circuit'),
      new Hazard(540, 220, 'oil'),
      new Hazard(880, 250, 'circuit'),
      new Hazard(1140, 190, 'oil'),
      new Hazard(1410, 150, 'circuit'),
      new Hazard(1710, 230, 'oil')
    );
  }

  public getTotalCollectibles(): number {
    return this.totalCollectibles;
  }
}
