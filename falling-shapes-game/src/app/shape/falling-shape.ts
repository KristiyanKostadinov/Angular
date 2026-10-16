import { Graphics } from 'pixi.js';

export type ShapeKind =
  | 'triangle'
  | 'square'
  | 'pentagon'
  | 'hexagon'
  | 'circle'
  | 'ellipse'
  | 'star'
  | 'irregular';

const SHAPE_SIZE = 55;

export class FallingShape {
  readonly graphics = new Graphics();
  private speed = 0;

  constructor(kind: ShapeKind, x: number, y: number, color: number) {
    switch (kind) {
      case 'triangle':
        this.drawPolygon(3, 48, color);
        break;

      case 'square':
        this.drawPolygon(4, 42, color);
        break;

      case 'pentagon':
        this.drawPolygon(5, 48, color);
        break;

      case 'hexagon':
        this.drawPolygon(6, 48, color);
        break;

      case 'circle':
        this.graphics
          .circle(0, 0, randomNumber(22, 50))
          .fill(color);
        break;

      case 'ellipse':
        this.graphics
          .ellipse(0, 0, randomNumber(28, 55), randomNumber(18, 38))
          .fill(color);
        break;

      case 'star':
        this.drawStar(color);
        break;

      case 'irregular':
        this.drawIrregularPolygon(color);
        break;
    }

    this.graphics.position.set(x, y);
    this.graphics.eventMode = 'static';
    this.graphics.cursor = 'pointer';
  }

  update(seconds: number, gravity: number): void {
    this.speed += gravity * seconds;
    this.graphics.y += this.speed * seconds;
  }

  isVisible(height: number): boolean {
    return (
      this.graphics.y + SHAPE_SIZE > 0 &&
      this.graphics.y - SHAPE_SIZE < height
    );
  }

  isBelow(height: number): boolean {
    return this.graphics.y - SHAPE_SIZE > height;
  }

  destroy(): void {
    this.graphics.destroy();
  }

  private drawPolygon(
    sides: number,
    radius: number,
    color: number,
  ): void {
    const points: number[] = [];
    const rotation = Math.random() * Math.PI * 2;

    for (let i = 0; i < sides; i++) {
      const angle = rotation + (i * Math.PI * 2) / sides;
      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );
    }

    this.graphics.poly(points).fill(color);
  }

  private drawIrregularPolygon(color: number): void {
    const points: number[] = [];
    const sides = 7 + Math.floor(Math.random() * 6);

    for (let i = 0; i < sides; i++) {
      const angle = (i * Math.PI * 2) / sides;
      const radius = randomNumber(20, 55);

      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );
    }

    this.graphics.poly(points).fill(color);
  }

  private drawStar(color: number): void {
    const points: number[] = [];
    const rotation = Math.random() * Math.PI * 2;

    for (let i = 0; i < 10; i++) {
      const angle = rotation + (i * Math.PI) / 5;
      const radius = i % 2 === 0 ? 55 : 26;

      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );
    }

    this.graphics.poly(points).fill(color);
  }
}

function randomNumber(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
