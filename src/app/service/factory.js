import { BehaviorSubject } from 'rxjs';

export function createService (config) {
  const { state, selectors, actions } = config;

  const service = {
    state: {
      ...state
    }
  };

  injectBehaviour(service);
  injectCallers(service, 'selectors', selectors);
  injectCallers(service, 'actions', actions);

  return service;
}

function injectBehaviour (service) {
  const subject = new BehaviorSubject(service);

  service.update = newState => {
    const oldState = { ...service.state };
    service.state = {
      ...oldState,
      ...newState
    };

    subject.next(service);
  };

  service.subscribe = observer => {
    const subscription = subject.subscribe(observer);
    return () => subscription.unsubscribe();
  };
}

function injectCallers (service, group, callers = {}) {
  Object.entries(callers).forEach(([key, caller]) => {
    service[group][key] = (...args) => caller(service, ...args);
  });
}
