import { Player } from './Player';
import { Level } from './Level';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public renderBackground() {
    // Gradient sky background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Add simple clouds
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.renderCloud(150, 80, 40);
    this.renderCloud(400, 120, 50);
    this.renderCloud(650, 90, 35);
  }

  private renderCloud(x: number, y: number, size: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.4, y, size * 0.8, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.8, y, size * 0.6, 0, Math.PI * 2);
    this.ctx.arc(x - size * 0.2, y, size * 0.7, 0, Math.PI * 2);
    this.ctx.fill();
  }

  public renderLevel(level: Level) {
    // Render platforms
    for (const platform of level.platforms) {
      this.ctx.fillStyle = platform.color;
      this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      
      // Add platform border
      this.ctx.strokeStyle = '#654321';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }

    // Render collectibles
    for (const collectible of level.collectibles) {
      // Draw collectible with emoji
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      
      // Glow effect
      this.ctx.shadowColor = collectible.color;
      this.ctx.shadowBlur = 10;
      
      // Background circle
      this.ctx.fillStyle = collectible.color;
      this.ctx.beginPath();
      this.ctx.arc(
        collectible.x + collectible.width / 2,
        collectible.y + collectible.height / 2,
        collectible.width / 2,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      
      // Reset shadow
      this.ctx.shadowBlur = 0;
      
      // Draw emoji
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(
        collectible.emoji,
        collectible.x + collectible.width / 2,
        collectible.y + collectible.height / 2
      );
    }

    // Render hazards
    for (const hazard of level.hazards) {
      this.ctx.font = '24px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      
      // Danger glow effect
      if (!hazard.hasHit) {
        this.ctx.shadowColor = '#FF0000';
        this.ctx.shadowBlur = 8;
      }
      
      // Background
      this.ctx.fillStyle = hazard.hasHit ? '#888888' : hazard.color;
      this.ctx.fillRect(hazard.x, hazard.y, hazard.width, hazard.height);
      
      // Reset shadow
      this.ctx.shadowBlur = 0;
      
      // Draw emoji
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(
        hazard.emoji,
        hazard.x + hazard.width / 2,
        hazard.y + hazard.height / 2
      );
    }
  }

  public renderPlayer(player: Player) {
    // Debug logging (occasional)
    if (Math.random() < 0.1) {
      console.log(`Rendering player at (${player.x}, ${player.y}) with size ${player.width}x${player.height}`);
    }
    
    // Draw robot character
    this.ctx.fillStyle = player.color;
    
    // Robot body
    this.ctx.fillRect(player.x + 4, player.y + 8, player.width - 8, player.height - 12);
    
    // Robot head
    this.ctx.fillStyle = '#5A9BD4';
    this.ctx.fillRect(player.x + 8, player.y, player.width - 16, 12);
    
    // Robot eyes
    this.ctx.fillStyle = '#FFD700';
    this.ctx.fillRect(player.x + 10, player.y + 2, 4, 4);
    this.ctx.fillRect(player.x + player.width - 14, player.y + 2, 4, 4);
    
    // Robot antenna
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(player.x + player.width / 2, player.y);
    this.ctx.lineTo(player.x + player.width / 2, player.y - 6);
    this.ctx.stroke();
    
    // Antenna light
    this.ctx.fillStyle = '#FF4444';
    this.ctx.beginPath();
    this.ctx.arc(player.x + player.width / 2, player.y - 6, 2, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Robot legs
    this.ctx.fillStyle = player.color;
    this.ctx.fillRect(player.x + 6, player.y + player.height - 4, 6, 4);
    this.ctx.fillRect(player.x + player.width - 12, player.y + player.height - 4, 6, 4);
  }
}
