import { BehaviorSubject } from 'rxjs';

export class Base {
  subject = null;

  constructor (state = null) {
    this.subject = new BehaviorSubject(state);
  }

  get current () {
    return this.subject.value;
  }

  subscribe (observer) {
    const subscription = this.subject.subscribe(observer);
    return () => subscription.unsubscribe();
  };
}
