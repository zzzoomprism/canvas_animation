import {
  POSITION,
  RIGHT_ARC_CONFIG,
  LEFT_ARC_CONFIG,
  PACMAN_CONFIG,
  BOUNDARY_SIZE
} from './../constants';

let mouthClose = true;

export class Pacman {
  constructor() {
    this.radius = PACMAN_CONFIG.RADIUS;
    this.x =
      window.innerWidth / 2 -
      BOUNDARY_SIZE.WIDTH / 2 +
      PACMAN_CONFIG.RADIUS +
      BOUNDARY_SIZE.PADDING;
    this.y = window.innerHeight / 2;
    this.angle = RIGHT_ARC_CONFIG.START;
    this.mouthCloseSize = 0;
  }

  init(ctx, position) {
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';

    ctx.beginPath();

    const x_saver = this.x;
    const y_saver = this.y;

    let currentStartPoint;
    let currentEndPoint;
    const isPositionRight = position === POSITION.RIGHT;

    if (isPositionRight) {
      currentStartPoint = RIGHT_ARC_CONFIG.START - this.mouthCloseSize;
      currentEndPoint = RIGHT_ARC_CONFIG.END + this.mouthCloseSize;
    } else {
      currentStartPoint = LEFT_ARC_CONFIG.START - this.mouthCloseSize;
      currentEndPoint = LEFT_ARC_CONFIG.END + this.mouthCloseSize;
    }

    ctx.moveTo(x_saver, y_saver);
    let line_x = Math.round(this.radius * Math.cos(currentStartPoint));
    let line_y = Math.round(this.radius * Math.sin(currentStartPoint));
    ctx.moveTo(x_saver + line_x, this.y + line_y);
    ctx.lineTo(x_saver, this.y);

    line_x = Math.round(this.radius * Math.cos(currentEndPoint));
    line_y = Math.round(this.radius * Math.sin(currentEndPoint));
    ctx.moveTo(x_saver + line_x, y_saver + line_y);
    ctx.lineTo(x_saver, y_saver);

    ctx.arc(x_saver, y_saver, this.radius, currentStartPoint, currentEndPoint, !isPositionRight);
    ctx.closePath();
    ctx.fill();
  }

  isMouthClose() {
    if (this.mouthCloseSize <= -0.3) return true;
    if (this.mouthCloseSize >= 0.5) return false;
    return mouthClose;
  }

  draw(ctx, position, x, y) {
    ctx.clearRect(
      this.x - this.radius - PACMAN_CONFIG.PADDING,
      this.y - this.radius - PACMAN_CONFIG.PADDING,
      this.radius * 2 + PACMAN_CONFIG.PADDING,
      this.radius * 2 + PACMAN_CONFIG.PADDING
    );
    mouthClose = this.isMouthClose();

    if (mouthClose) this.mouthCloseSize += 0.05;
    else this.mouthCloseSize -= 0.05;

    switch (position) {
      case POSITION.RIGHT: {
        this.x += 5;
        this.init(ctx, POSITION.RIGHT);
        break;
      }
      case POSITION.LEFT: {
        this.x -= 5;
        this.init(ctx, POSITION.LEFT);
        break;
      }
    }
    this.drawRef = window.requestAnimationFrame(() => this.draw(ctx, POSITION.RIGHT));
  }
}
