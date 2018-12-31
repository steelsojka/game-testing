import { Inject } from 'mindi';

import { SPRITES } from '../constants';
import { PhysicsEntity } from '../PhysicsEntity';
import { GameState } from '../GameState';

export class PlayState extends GameState {
  constructor(
    @Inject(SPRITES) private sprites: PhysicsEntity[]
  ) {
    super();
  }

  update(): void {
    for (let i = 0, len = this.sprites.length; i < len; i++) {
      this.sprites[i].update();
    }
  }
}