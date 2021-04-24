import { createBaseStore } from './base';

export function createEntityStore (config) {
  const { repository, filters, authStore } = config;

  const state = {
    items: {}
  };

  const getters = {
    get allItems () {
      return Object.values(state.items);
    },
    get itemById () {
      return id => state.items[id];
    }
  };

  const baseStore = createBaseStore({ state, getters });

  let unsubscribe = () => null;
  authStore.subscribe(getters => {
    unsubscribe();
    if (getters.isSignedIn) {
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
