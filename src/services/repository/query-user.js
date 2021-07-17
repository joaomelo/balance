import { query } from '../../app/query';
import { attachDriver } from './query';

export function queryRepoWithUser (userIdSelector, driver) {
  const itemsQuery = query({});

  userIdSelector.subscribe(userId => {
    if (userId) {
      const driverWithUser = driver.where('user', '==', userId);
      attachDriver(itemsQuery, driverWithUser);
    } else {
      itemsQuery.onDouse();
      itemsQuery.update({});
    }
  });

  return itemsQuery;
}
