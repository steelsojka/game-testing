import { Token } from 'mindi';
import * as PIXI from 'pixi.js';

import { GameState } from './GameState';
import { PhysicsEntity } from './PhysicsEntity';

export interface Platform {
  attach(node: HTMLCanvasElement): void;
}

export const APPLICATION = new Token<PIXI.Application>('Application');
export const PLATFORM = new Token<Platform>('Platform');
export const GAME_STATES = new Token<GameState[]>('GameStates');
export const SPRITES = new Token<PhysicsEntity[]>('Sprites');
