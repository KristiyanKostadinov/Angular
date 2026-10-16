import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';

import {
  Application,
  Container,
  FederatedPointerEvent,
  Graphics,
} from 'pixi.js';

import { FallingShape, ShapeKind } from './shape/falling-shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('canvasHost', { static: true })
  canvasHost!: ElementRef<HTMLDivElement>;

  readonly shapeCount = signal(0);
  readonly spawnRate = signal(1);

  private readonly gravity = 120;
  private readonly maxShapes = 50;

  private readonly shapeKinds: ShapeKind[] = [
    'triangle',
    'square',
    'pentagon',
    'hexagon',
    'circle',
    'ellipse',
    'star',
    'irregular',
  ];

  private app?: Application;
  private readonly world = new Container();
  private readonly mask = new Graphics();
  private readonly shapes = new Set<FallingShape>();

  private resizeObserver?: ResizeObserver;
  private spawnTimer = 0;
  private destroyed = false;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      void this.startGame();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;

    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;

    for (const shape of this.shapes) {
      shape.destroy();
    }

    this.shapes.clear();

    this.app?.destroy(
      { removeView: true },
      { children: true },
    );

    this.app = undefined;
  }

  changeRate(change: number): void {
    this.spawnRate.update(rate =>
      Math.max(0, Math.min(10, rate + change)),
    );
  }

  private async startGame(): Promise<void> {
    const host = this.canvasHost.nativeElement;
    const app = new Application();

    await app.init({
      width: host.clientWidth || 600,
      height: host.clientHeight || 400,
      background: 0xffffff,
      antialias: true,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
    });

    if (this.destroyed) {
      app.destroy(
        { removeView: true },
        { children: true },
      );
      return;
    }

    this.app = app;
    app.ticker.maxFPS = 30;

    const canvas = app.canvas;

    canvas.style.display = 'block';
    canvas.style.touchAction = 'manipulation';

    canvas.setAttribute(
      'aria-label',
      'Falling shapes. Tap inside to add a shape.',
    );

    host.appendChild(canvas);

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    app.stage.addChild(this.world, this.mask);
    this.world.mask = this.mask;

    this.updateMask();

    app.stage.on(
      'pointerdown',
      (event: FederatedPointerEvent) => {
        this.addShape(event.global.x, event.global.y);
      },
    );

    this.resizeObserver = new ResizeObserver(() => {
      if (this.destroyed || this.app !== app) {
        return;
      }

      const width = host.clientWidth;
      const height = host.clientHeight;

      if (width <= 0 || height <= 0) {
        return;
      }

      app.renderer.resize(width, height);
      app.stage.hitArea = app.screen;

      this.updateMask();
    });

    this.resizeObserver.observe(host);

    app.ticker.add(() => {
      if (!this.destroyed && this.app === app) {
        this.update(
          Math.min(app.ticker.deltaMS / 1000, 0.1),
        );
      }
    });
  }

  private update(seconds: number): void {
    const app = this.app;

    if (!app) {
      return;
    }

    const rate = this.spawnRate();

    if (rate > 0 && this.shapes.size < this.maxShapes) {
      this.spawnTimer += seconds;

      if (this.spawnTimer >= 1 / rate) {
        this.spawnTimer = 0;

        this.addShape(
          Math.random() * app.screen.width,
          -55,
        );
      }
    } else {
      this.spawnTimer = 0;
    }

    let visibleShapes = 0;

    for (const shape of this.shapes) {
      shape.update(seconds, this.gravity);

      if (shape.isBelow(app.screen.height)) {
        this.removeShape(shape, false);
      } else if (shape.isVisible(app.screen.height)) {
        visibleShapes++;
      }
    }

    this.setShapeCount(visibleShapes);
  }

  private addShape(x: number, y: number): void {
    if (
      this.destroyed ||
      this.shapes.size >= this.maxShapes ||
      !this.app
    ) {
      return;
    }

    const kind =
      this.shapeKinds[
        Math.floor(Math.random() * this.shapeKinds.length)
      ];

    const color = Math.floor(Math.random() * 0xffffff);

    const shape = new FallingShape(kind, x, y, color);

    shape.graphics.on(
      'pointerdown',
      (event: FederatedPointerEvent) => {
        event.stopPropagation();
        this.removeShape(shape);
      },
    );

    this.world.addChild(shape.graphics);
    this.shapes.add(shape);

    this.updateVisibleCount();
  }

  private removeShape(
    shape: FallingShape,
    updateCount = true,
  ): void {
    if (!this.shapes.delete(shape)) {
      return;
    }

    this.world.removeChild(shape.graphics);
    shape.destroy();

    if (updateCount) {
      this.updateVisibleCount();
    }
  }

  private updateVisibleCount(): void {
    const height = this.app?.screen.height ?? 0;
    let count = 0;

    for (const shape of this.shapes) {
      if (shape.isVisible(height)) {
        count++;
      }
    }

    this.setShapeCount(count);
  }

  private setShapeCount(count: number): void {
    if (count !== this.shapeCount()) {
      this.zone.run(() => {
        this.shapeCount.set(count);
      });
    }
  }

  private updateMask(): void {
    if (!this.app) {
      return;
    }

    const { width, height } = this.app.screen;

    this.mask
      .clear()
      .rect(0, 0, width, height)
      .fill(0xffffff);
  }
}
