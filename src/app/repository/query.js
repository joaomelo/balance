import firebase from 'firebase/app';
import { query, select } from '../query';

export function queryRepository (driver) {
  let repoUnsub = () => null;
  const itemsQuery = query({}, repoUnsub);

  repoUnsub = driver.onSnapshot(snapshot => updateItems(itemsQuery, snapshot));

  return itemsQuery;
}

export function selectItemById (query, id) {
  return select(query, current => current[id]);
}

export function selectAllItems (query) {
  return select(query, current => Object.values(current));
}

export function selectActiveItems (query) {
  return select(query, current => Object.values(current).filter(i => !i._deleted));
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
