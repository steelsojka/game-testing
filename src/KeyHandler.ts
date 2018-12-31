import { fromEvent, Observable, Subject, Unsubscribable, merge, OperatorFunction, Subscription } from 'rxjs';
import { share, tap, takeUntil, filter, mapTo } from 'rxjs/operators';

export enum KeyState {
  UP,
  DOWN
}

export class KeyHandler implements Unsubscribable {
  private _destroyed$: Subject<void> = new Subject();
  readonly destroyed$: Observable<void> = this._destroyed$.asObservable();

  readonly isPressed: OperatorFunction<KeyState, void> = this.isKeyState(KeyState.DOWN);
  readonly isReleased: OperatorFunction<KeyState, void> = this.isKeyState(KeyState.UP);

  readonly keydown$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    takeUntil(this.destroyed$),
    tap(event => event.preventDefault()),
    share());

  readonly keyup$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
    takeUntil(this.destroyed$),
    tap(event => event.preventDefault()),
    share());

  unsubscribe(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  isKeyState(state: KeyState): OperatorFunction<KeyState, void> {
    return source => source.pipe(
      filter(value => value === state),
      mapTo(undefined));
  }

  onKeyCode(keyCode: number, pressed: () => void, released: () => void): Subscription {
    return this.getSourceFromKeyCode(keyCode)
      .subscribe(state => {
        if (state === KeyState.DOWN) {
          pressed();
        } else {
          released();
        }
      });
  }

  getSourceFromKeyCode(keyCode: number): Observable<KeyState> {
    return merge(
      this.keydown$.pipe(
        filter(event => event.keyCode === keyCode),
        mapTo(KeyState.DOWN)),
      this.keyup$.pipe(
        filter(event => event.keyCode === keyCode),
        mapTo(KeyState.UP)));
  }
}