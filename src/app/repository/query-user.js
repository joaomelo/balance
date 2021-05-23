import { query } from '../query';
import { queryRepository } from './query';

export function queryRepoWithUser (userIdSelector, driver) {
  let itemsQuery = query({});

  userIdSelector.subscribe(userId => {
    itemsQuery.douse();

    if (userId) {
      const driverWithUser = driver.where('user', '==', userId);
      itemsQuery = queryRepository(driverWithUser);
    } else {
      itemsQuery = query({});
    }
  });

  return itemsQuery;
}
