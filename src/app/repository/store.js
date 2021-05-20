import { createStore } from '../service';
import { igniteQuery } from './query';

export function createQueryStore (query) {
  let queryUnsub = () => null;
  const repositoryStore = createStore({}, queryUnsub);

  const updateStore = itemsArray => {
    const items = itemsArray.reduce((acc, item) => {
      acc[item.id] = { ...item };
      return acc;
    }, {});
    repositoryStore.update({ ...items });
  };
  queryUnsub = igniteQuery(updateStore, query);

  return repositoryStore;
}

export function selectItemById (store, id) {
  return store.select(current => current[id]);
}

export function selectAllItems (store) {
  return store.select(current => Object.values(store.current));
}

export function selectActiveItems (store) {
  return store.select(current => Object.values(store.current).filter(i => !i._deleted));
}
