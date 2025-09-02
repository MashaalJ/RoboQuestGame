export class Hazard {
  public x: number;
  public y: number;
  public width: number = 32;
  public height: number = 32;
  public type: 'circuit' | 'oil' | 'tool';
  public color: string;
  public emoji: string;
  public hasHit: boolean = false;

  constructor(x: number, y: number, type: 'circuit' | 'oil' | 'tool') {
    this.x = x;
    this.y = y;
    this.type = type;
    
    switch (type) {
      case 'circuit':
        this.emoji = "⚡";
        this.color = "#E74C3C";
        break;
      case 'oil':
        this.emoji = "🛢️";
        this.color = "#34495E";
        break;
      case 'tool':
        this.emoji = "🔧";
        this.color = "#E67E22";
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
