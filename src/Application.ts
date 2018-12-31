import { Inject, PostConstruct, Injectable } from 'mindi';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

import { PLATFORM, Platform, GAME_STATES, APPLICATION, SPRITES } from './constants';
import { GameStateManager } from './GameState';
import { PlayState } from './states/PlayState';
import { Floor } from './Floor';
import { Block } from './Block';
import { PhysicsEntity } from './PhysicsEntity';
import { timer } from 'rxjs';

const { World, Engine, Bounds, Vertices, Vector } = Matter;

@Injectable({
  providers: [
    GameStateManager,
    { provide: SPRITES, useFactory: () => [] },
    {
      provide: GAME_STATES,
      useClass: PlayState,
      multi: true
    }
  ]
})
export class Application {
  readonly engine = Engine.create();
  readonly world = this.engine.world;

  constructor(
    @Inject(PLATFORM) private platform: Platform,
    @Inject(APPLICATION) private app: PIXI.Application,
    @Inject(GameStateManager) private gameStateManager: GameStateManager,
    @Inject(SPRITES) private sprites: PhysicsEntity[]
  ) {}

  @PostConstruct()
  initialize(): void {
    this.sprites.push(new Floor({
      x: this.app.view.width / 2,
      y: this.app.view.height - 5,
      width: this.app.view.width,
      height: 5,
      engine: this.engine
    }).initialize());

    World.add(this.world, [
      ...this.sprites.map(sprite => sprite.getBody())
    ])
    this.app.stage.addChild(...this.sprites.map(sprite => sprite.getDisplayObject()));
    this.platform.attach(this.app.view);
    this.gameStateManager.setState(PlayState);
  }

  start(): void {
    Engine.run(this.engine);
    this.app.ticker.add(this.loop.bind(this));

    timer(0, 250).subscribe(() => {
      const block = new Block({
        x: Math.min(Math.max(Math.random() * 1000, 25), 600),
        y: -25,
        width: 50,
        height: 50,
        engine: this.engine
      })
        .initialize();

      this.sprites.push(block);
      World.add(this.world, [ block.getBody() ]);
      this.app.stage.addChild(block.getDisplayObject());
    });
  }

  private loop(): void {
    this.gameStateManager.update();
  }
}