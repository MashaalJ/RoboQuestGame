export class Player {
  public x: number;
  public y: number;
  public width: number = 32;
  public height: number = 32;
  public velocityX: number = 0;
  public velocityY: number = 0;
  public speed: number = 200;
  public jumpPower: number = 400;
  public onGround: boolean = false;
  public color: string = '#4A90E2';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public update(deltaTime: number, inputState: any) {
    // Horizontal movement
    this.velocityX = 0;
    
    if (inputState.left) {
      this.velocityX = -this.speed;
    }
    if (inputState.right) {
      this.velocityX = this.speed;
    }

    // Jumping
    if (inputState.jump && this.onGround) {
      this.velocityY = -this.jumpPower;
      this.onGround = false;
    }

    // Apply horizontal movement
    this.x += this.velocityX * deltaTime;

    // Keep player on screen horizontally
    this.x = Math.max(0, Math.min(this.x, 800 - this.width));
  }

  public reset(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.onGround = false;
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
