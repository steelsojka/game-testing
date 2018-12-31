import { KeyHandler, KeyState } from './KeyHandler';
import { share } from 'rxjs/operators';

export class KeyDirectionHandler extends KeyHandler {
  readonly up$ = this.getSourceFromKeyCode(38);
  readonly down$ = this.getSourceFromKeyCode(40);
  readonly left$ = this.getSourceFromKeyCode(37);
  readonly right$ = this.getSourceFromKeyCode(39);
  readonly upPressed$ = this.up$.pipe(this.isPressed, share());
  readonly upReleased$ = this.up$.pipe(this.isReleased, share());
  readonly leftPressed$ = this.left$.pipe(this.isPressed, share());
  readonly leftReleased$ = this.left$.pipe(this.isReleased, share());
  readonly rightPressed$ = this.right$.pipe(this.isPressed, share());
  readonly rightReleased$ = this.right$.pipe(this.isReleased, share());
  readonly downPressed$ = this.down$.pipe(this.isPressed, share());
  readonly downReleased$ = this.down$.pipe(this.isReleased, share());
}