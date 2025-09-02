import { Player } from './Player';
import { Platform } from './Level';
import { Collectible } from './Collectible';
import { Hazard } from './Hazard';

export class Physics {
  private gravity: number = 800;

  public updatePlayer(player: Player, platforms: Platform[]) {
    // Apply gravity
    player.velocityY += this.gravity * (1/60); // Assuming 60 FPS
    
    // Update vertical position
    player.y += player.velocityY * (1/60);
    
    // Check platform collisions
    player.onGround = false;
    
    for (const platform of platforms) {
      if (this.checkPlayerPlatformCollision(player, platform)) {
        // Landing on top of platform
        if (player.velocityY > 0 && player.y < platform.y) {
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.onGround = true;
        }
      }
    }
  }

  private checkPlayerPlatformCollision(player: Player, platform: Platform): boolean {
    return (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    );
  }

  public checkCollision(player: Player, object: Collectible | Hazard): boolean {
    const playerBounds = player.getBounds();
    const objectBounds = object.getBounds();
    
    return (
      playerBounds.x < objectBounds.x + objectBounds.width &&
      playerBounds.x + playerBounds.width > objectBounds.x &&
      playerBounds.y < objectBounds.y + objectBounds.height &&
      playerBounds.y + playerBounds.height > objectBounds.y
    );
  }
}
