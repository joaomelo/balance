import { BehaviorSubject } from 'rxjs';

export function createService ({ state, selectors, actions }) {
  const service = {
    state: {},
    selectors: {},
    actions: {}
  };

  injectStateManagement(service, state);
  injectReactivity(service);
  injectMethods(service, 'selectors', selectors);
  injectMethods(service, 'actions', actions);

  return service;
}

function injectStateManagement (service, initialState) {
  service.state = {
    ...initialState
  };

  service.update = newState => {
    const oldState = { ...service.state };
    service.state = {
      ...oldState,
      ...newState
    };
    service.invalidate();
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

function injectMethods (service, group, callers = {}) {
  Object.entries(callers).forEach(([key, caller]) => {
    service[group][key] = (...args) => caller(service, ...args);
  });
}
