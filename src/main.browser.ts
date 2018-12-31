import 'reflect-metadata';
import { Injector } from 'mindi';
import * as PIXI from 'pixi.js';

import { PLATFORM, APPLICATION } from './constants';
import { Application } from './Application';

const injector = Injector.fromInjectable(Application, [
  Application,
  {
    provide: APPLICATION,
    useFactory: () => new PIXI.Application(800, 600, { antialias: true })
  },
  {
    provide: PLATFORM,
    useValue: {
      attach: (node: HTMLCanvasElement) => window.document.body.appendChild(node)
    }
  }
]);

injector.get(Application).start();

export default injector;