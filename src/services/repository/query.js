import firebase from 'firebase/app';
import { query } from '../../libs/query';

export function queryRepository (driver) {
  const itemsQuery = query({});
  attachDriver(itemsQuery, driver);
  return itemsQuery;
}

export function attachDriver (itemsQuery, driver) {
  itemsQuery.onDouse();
  const repoUnsub = driver.onSnapshot(snapshot => updateItems(itemsQuery, snapshot));
  itemsQuery.onDouse = repoUnsub;
}

function updateItems (query, snapshot) {
  const items = snapshot.docs.reduce((acc, doc) => {
    const item = convertDocToItem(doc.data());
    acc[item.id] = item;
    return acc;
  }, {});

  query.update(items);
};

function convertDocToItem (docData) {
  return Object
    .entries(docData)
    .reduce((item, [field, value]) => {
      const parsedValue = value instanceof firebase.firestore.Timestamp
        ? value.toDate()
        : value;
      item[field] = parsedValue;
      return item;
    }, {});
};
