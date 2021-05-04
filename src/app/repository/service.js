import { createService } from '../service';
import { set } from './set';
import { del } from './del';

export function createRepositoryService (name, config) {
  const { firestore } = config;
  const collection = firestore.collection(name);

  const repositoryService = createBasicRepositoryService(collection, config);
  connectRepositoryService(repositoryService, collection, config);

  return repositoryService;
}

function createBasicRepositoryService (collection, config) {
  const { firestore, selectors: featureSelectors } = config;

  const state = {
    items: {}
  };

  const selectors = {
    allItems: ({ state }) => Object.values(state.items),
    activeItems: ({ selectors }) => selectors.allItems().filter(i => !i._deleted),
    itemById: ({ state }, id) => state.items[id],
    ...featureSelectors
  };

  const actions = {
    set: items => set(items, collection, firestore),
    del: ids => del(ids, collection, firestore)
    igniteQuery: /// action that start updatin the state
  };

  const repositoryService = createService({ state, selectors, actions });
}

export function connectRepositoryService (repositoryService, config) {
  const { filters, identityService } = config;
  let unsubscribe = () => null;
  identityService.subscribe(({ selectors }) => {
    unsubscribe();
    if (selectors.isSignedIn()) {
      unsubscribe = repository.subscribe(filters, items => {
        state.items = items.reduce((acc, item) => {
          acc[item.id] = { ...item };
          return acc;
        }, {});
        baseStore.invalidate();
      });
    } else {
      unsubscribe = () => null;
      state.items = [];
      baseStore.invalidate();
    }
  });

  return baseStore;
}
