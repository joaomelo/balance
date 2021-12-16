import firebase from "firebase/app";
import { store } from "@joaomelo/stream";

export function queryRepository(driver) {
  const itemsQuery = store({});
  attachDriver(itemsQuery, driver);
  return itemsQuery;
}

export function attachDriver(itemsQuery, driver) {
  itemsQuery.close();
  const repoUnsub = driver.onSnapshot((snapshot) =>
    updateItems(itemsQuery, snapshot)
  );
  itemsQuery.onClose = repoUnsub;
}

function updateItems(query, snapshot) {
  const items = snapshot.docs.reduce((acc, doc) => {
    const item = convertDocToItem(doc.data());
    acc[item.id] = item;
    return acc;
  }, {});

  query.update(items);
}

function convertDocToItem(docData) {
  return Object.entries(docData).reduce((item, [field, value]) => {
    const parsedValue =
      value instanceof firebase.firestore.Timestamp ? value.toDate() : value;
    item[field] = parsedValue;
    return item;
  }, {});
}
