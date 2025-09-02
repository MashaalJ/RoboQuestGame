export class Collectible {
  public x: number;
  public y: number;
  public width: number = 24;
  public height: number = 24;
  public type: 'sensor' | 'motor' | 'wire' | 'gear' | 'battery';
  public fact: string;
  public emoji: string;
  public color: string;

  constructor(x: number, y: number, type: 'sensor' | 'motor' | 'wire' | 'gear' | 'battery') {
    this.x = x;
    this.y = y;
    this.type = type;
    
    // Set properties based on type
    switch (type) {
      case 'sensor':
        this.fact = "Robots use sensors to detect the world around them, like cameras and microphones!";
        this.emoji = "👁️";
        this.color = "#FF6B6B";
        break;
      case 'motor':
        this.fact = "Motors help robots move their parts, like wheels, arms, and legs!";
        this.emoji = "⚙️";
        this.color = "#4ECDC4";
        break;
      case 'wire':
        this.fact = "Wires connect robot parts together so they can communicate!";
        this.emoji = "🔌";
        this.color = "#45B7D1";
        break;
      case 'gear':
        this.fact = "Gears help robots move more precisely and with more power!";
        this.emoji = "⚙️";
        this.color = "#96CEB4";
        break;
      case 'battery':
        this.fact = "Batteries provide energy for robots to power all their systems!";
        this.emoji = "🔋";
        this.color = "#FFEAA7";
        break;
    }
  }

  public getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
