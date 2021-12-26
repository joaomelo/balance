import { store } from "@joaomelo/stream";
import { attachDriver } from "./query";

export function queryRepoWithUser(userIdStream, driver) {
  const itemsQuery = store({});

  userIdStream.subscribe((userId) => {
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
