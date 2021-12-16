import { store } from "@joaomelo/stream";
import { attachDriver } from "./query";

export function queryRepoWithUser(userIdSelector, driver) {
  const itemsQuery = store({});

  userIdSelector.subscribe((userId) => {
    if (userId) {
      const driverWithUser = driver.where("user", "==", userId);
      attachDriver(itemsQuery, driverWithUser);
    } else {
      itemsQuery.close();
      itemsQuery.update({});
    }
  });

  return itemsQuery;
}
