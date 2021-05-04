import { createService } from '../service';
import { set } from './set';
import { del } from './del';
import { igniteQuery } from './query';

export async function createRepositoryServiceFactory (firestore) {
  return (name, config) => createRepositoryService(name, config, firestore);
}

export function createRepositoryService (name, config, firestore) {
  const collection = firestore.collection(name);

  const state = {
    items: {}
  };

  const selectors = {
    allItems: ({ state }) => Object.values(state.items),
    activeItems: ({ selectors }) => selectors.allItems().filter(i => !i._deleted),
    itemById: ({ state }, id) => state.items[id],
    ...config.selectors
  };

  const actions = {
    set: (service, items) => set(items, collection, firestore),
    del: (service, ids) => del(ids, collection, firestore),
    igniteQuery: (service, filters) => igniteQuery(service, filters, collection, firestore)
  };

  return createService({ state, selectors, actions });
}
