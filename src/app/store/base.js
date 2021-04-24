import { BehaviorSubject } from 'rxjs';

export function createBaseStore (config) {
  const { state, getters } = config;

  const subject = new BehaviorSubject(getters);
  const invalidate = () => subject.next(getters);
  const subscribe = observer => {
    const subscription = subject.subscribe(observer);
    return () => subscription.unsubscribe();
  };

  const store = {
    state,
    getters,
    subscribe,
    invalidate
  };

  return store;
}
