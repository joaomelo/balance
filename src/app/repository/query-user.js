import { store } from '../store';
import { storeQuery } from './query';

export function storeQueryWithUser (userStore, query) {
  let itemsStore = store({});

  userStore.subscribe(({ userId }) => {
    itemsStore.douse();

    if (userId) {
      const queryWithUser = query.where('user', '==', userId);
      itemsStore = storeQuery(queryWithUser);
    } else {
      itemsStore = store({});
    }
  });

  return itemsStore;
}
