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
    igniteQuery: ({ state, update, douseQuery }, filters) => {
      douseQuery();

      const updateItems = items => update({ items: indexAsObject(items) });
      const newQueryUnsub = igniteQuery(updateItems, collection, filters);

      update({ queryUnsub: newQueryUnsub }, { mute: true });
    },
    douseQuery: ({ state }) => state.queryUnsub(),
    ...service.actions
  };

  return createService({ state, selectors, actions });
}

function indexAsObject (items) {
  return items.reduce((acc, item) => {
    acc[item.id] = { ...item };
    return acc;
  }, {});
}
