import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

import { PhysicsEntity, PhysicsEntityOptions } from './PhysicsEntity';


export interface PhysicsGraphicOptions extends PhysicsEntityOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class PhysicsGraphic extends PhysicsEntity {
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  graphic!: PIXI.Graphics;

  constructor(options: PhysicsGraphicOptions) {
    super(options);
  }

  initialize(): this {
    this.graphic = new PIXI.Graphics();
    this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, this.configureBody());
    this.drawBody();

    return this;
  }

  getDisplayObject(): PIXI.DisplayObject {
    return this.graphic;
  }

  private drawBody(): void {
    this.graphic.lineStyle(0);
    this.graphic.beginFill(0xFFFF0B, 0.5);

    for (const part of this.body.parts) {
      this.graphic.moveTo(part.vertices[0].x - this.body.position.x, part.vertices[0].y - this.body.position.y);

      for (let v = 1, len = part.vertices.length; v < len; v++) {
        const vert = part.vertices[v]!;

        this.graphic.lineTo(vert.x - this.body.position.x, vert.y - this.body.position.y);
      }

      this.graphic.moveTo(part.vertices[0].x - this.body.position.x, part.vertices[0].y - this.body.position.y);
      this.graphic.endFill();
    }
  }
}