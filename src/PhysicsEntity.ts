import * as Matter from 'matter-js';
import * as PIXI from 'pixi.js';

const { Engine, Bodies } = Matter;

export enum PhysicsSpriteType {
  CIRCLE,
  RECTANGLE
}

export interface PhysicsEntityOptions {
  // x: number;
  // y: number;
  // width: number;
  // height: number;
  // type: PhysicsSpriteType;
  engine: Matter.Engine;
}

export abstract class PhysicsEntity {
  body!: Matter.Body;

  constructor(
    options: PhysicsEntityOptions
  ) {
    Object.assign(this, options);
  }

  // initialize(): this {
    // this.draw();
    // this.sprite = new PIXI.Graphics();
    // this.sprite.lineStyle(0);
    // this.sprite.beginFill(0xFFFF0B, 0.5);

    // if (this.type === PhysicsSpriteType.RECTANGLE) {
    //   this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, this.configureBody());
    //   this.sprite.drawRect(this.x, this.y, this.width, this.height);
    // }

    // this.sprite.endFill();

    // return this;
  // }

  abstract initialize(): this;
  abstract getDisplayObject(): PIXI.DisplayObject;

  getBody(): Matter.Body {
    return this.body;
  }

  configureBody(): Matter.IChamferableBodyDefinition | undefined {
    return undefined;
  }

  update(): void {
    const object = this.getDisplayObject();
    const body = this.getBody();

    object.position.set(body.position.x, body.position.y);
    object.rotation = body.angle;
  }
}