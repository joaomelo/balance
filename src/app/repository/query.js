import firebase from 'firebase/app';
import { store, select } from '../store';

export function queryStore (query) {
  let queryUnsub = () => null;
  const items = store({}, queryUnsub);

  const updateItems = itemsArray => {
    const indexedItems = itemsArray.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    items.update(indexedItems);
  };
  queryUnsub = igniteQuery(query, updateItems);

  return items;
}

export function selectItemById (store, id) {
  return select(store, current => current[id]);
}

export function selectAllItems (store) {
  return select(store, current => Object.values(current));
}

export function selectActiveItems (store) {
  return select(store, current => Object.values(current).filter(i => !i._deleted));
}

function igniteQuery (query, observer) {
  const unsub = query.onSnapshot(snapshot => {
    const items = snapshot.docs.map(doc => convertDocToItem(doc.data()));
    observer(items);
  });

  return unsub;
}

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
