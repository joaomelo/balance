import firebase from 'firebase/app';

export function mountQuery (collection, filters = []) {
  return filters.reduce((query, filter) => {
    const filterData = filter();
    const { field, operator, value } = filterData;
    return query.where(field, operator, value);
  }, collection);
}

export function igniteQuery (observer, query) {
  const unsub = query.onSnapshot(snapshot => {
    const items = convertSnapshotToItems(snapshot);
    observer(items);
  });

  return unsub;
}

function convertSnapshotToItems (snapshot) {
  return snapshot.docs.map(doc => convertDocToItem(doc.data()));
}

function convertDocToItem (docData) {
  const item = {};

  for (const field in docData) {
    const value = docData[field] instanceof firebase.firestore.Timestamp
      ? docData[field].toDate()
      : docData[field];
    item[field] = value;
  }

  return item;
};
