import { BehaviorSubject } from "rxjs";

export class Stream {
  constructor(initialState, onClose) {
    this.observable = new BehaviorSubject(initialState);
    this.onClose = onClose;
  }

  get current() {
    return this.observable.value;
  }

  subscribe(observer) {
    const subscription = this.observable.subscribe(observer);
    return () => subscription.unsubscribe();
  }

  close() {
    this.observable.complete();
    this.onClose && this.onClose();
  }
}
