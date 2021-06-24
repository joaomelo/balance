import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export class Subject {
  baseObservable = null;
  immutableObservable = null;
  onDouse = () => null;

  constructor (state = null) {
    this.baseObservable = new BehaviorSubject(cloneDeep(state));
    this.immutableObservable = this
      .baseObservable
      .pipe(map(stateData => cloneDeep(stateData)));
  }

  get current () {
    return cloneDeep(this.baseObservable.value);
  }

  subscribe (observer) {
    const subscription = this.immutableObservable.subscribe(observer);
    return () => subscription.unsubscribe();
  };

  douse () {
    this.baseObservable.complete();
    this.onDouse();
  }
}
