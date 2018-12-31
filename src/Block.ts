import * as Matter from 'matter-js';

import { PhysicsGraphic } from './PhysicsGraphic';

export class Block extends PhysicsGraphic {
  configureBody(): Matter.IChamferableBodyDefinition {
    return {
      friction: 0.00001,
      restitution: 1,
      density: 0.5
    };
  }
}