import { Inject } from 'mindi';

import { GAME_STATES } from './constants';

export abstract class GameState {
  abstract update(): void;
}

export class GameStateManager {
  private states: Map<Function, GameState> = new Map();
  private currentState!: GameState;

  constructor(
    @Inject(GAME_STATES) states: GameState[]
  ) {
    for (const state of states) {
      this.states.set(state.constructor, state);
    }
  }

  setState(token: Function): void {
    this.currentState = this.states.get(token)!;
  }

  update(): void {
    this.currentState.update();
  }
}