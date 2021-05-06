import { BehaviorSubject } from 'rxjs';

export function createService ({ state, selectors, actions }) {
  const service = {};

  injectStateManagement(service, state);
  injectReactivity(service);
  injectMethods(service, { ...selectors, ...actions });

  return service;
}

function injectStateManagement (service, initialState) {
  service.state = {
    ...initialState
  };

  service.update = (newState, { mute = false } = {}) => {
    const oldState = { ...service.state };
    service.state = {
      ...oldState,
      ...newState
    };
    mute || service.invalidate();
  };
}

function injectReactivity (service) {
  const subject = new BehaviorSubject(service);

  service.invalidate = () => subject.next(service);

  service.subscribe = observer => {
    const subscription = subject.subscribe(observer);
    return () => subscription.unsubscribe();
  };
}

function injectMethods (service, fns = {}) {
  const reserved = ['state', 'update', 'invalidate', 'subscribe'];

  Object.entries(fns).forEach(([key, fn]) => {
    if (reserved.includes(key)) throw new Error(`"${key}" is a reserved name for service methods`);
    service[key] = (...args) => fn(service, ...args);
  });
}
