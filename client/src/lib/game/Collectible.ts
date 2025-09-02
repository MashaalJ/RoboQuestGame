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
        this.fact = "Ultrasonic sensors measure distance using sound waves at 40kHz frequency!";
        this.emoji = "📡";
        this.color = "#FF6B6B";
        break;
      case 'motor':
        this.fact = "Servo motors can rotate precisely to specific angles with 180° range!";
        this.emoji = "🔧";
        this.color = "#4ECDC4";
        break;
      case 'wire':
        this.fact = "Copper wires carry electrical signals at 3.3V or 5V between components!";
        this.emoji = "🔌";
        this.color = "#45B7D1";
        break;
      case 'gear':
        this.fact = "Gear ratios multiply torque - a 10:1 ratio increases force by 10x!";
        this.emoji = "⚙️";
        this.color = "#96CEB4";
        break;
      case 'battery':
        this.fact = "Lithium-ion batteries provide 3.7V per cell with 2000+ charge cycles!";
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
