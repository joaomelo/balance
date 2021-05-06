import { createService } from '../service';
import { set } from './set';
import { del } from './del';
import { igniteQuery } from './query';

export function createRepositoryServiceFactory (firestore) {
  return (name, service) => createRepositoryService(firestore, name, service);
}

export function createRepositoryService (firestore, name, service = {}) {
  const collection = firestore.collection(name);

  const state = {
    items: {},
    queryUnsub: () => null,
    ...service.state
  };

  const selectors = {
    itemById: ({ state }, id) => state.items[id],
    allItems: ({ state }) => Object.values(state.items),
    activeItems: ({ allItems }) => allItems().filter(i => !i._deleted),
    ...service.selectors
  };

  const actions = {
    set: (service, items) => set(collection, items),
    del: (service, ids) => del(collection, ids),
    igniteQuery: ({ update }, filters) => igniteQuery(collection, update, filters),
    ...service.actions
  };

  return createService({ state, selectors, actions });
}
