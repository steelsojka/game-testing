import * as Matter from 'matter-js';

import { PhysicsGraphic } from './PhysicsGraphic';

export class Floor extends PhysicsGraphic {
  configureBody(): Matter.IChamferableBodyDefinition {
    return {
      isStatic: true
    };
  }
}