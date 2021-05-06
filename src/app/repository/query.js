import firebase from 'firebase/app';

export function igniteQuery (updateItems, collection, filters) {
  const query = mountQuery(collection, filters);

  const unsub = query.onSnapshot(snapshot => {
    const items = convertSnapshotToItems(snapshot);
    updateItems(items);
  });

  return unsub;
}

function mountQuery (collection, filters = []) {
  return filters.reduce((query, filter) => {
    const filterData = filter();
    const { field, operator, value } = filterData;
    return query.where(field, operator, value);
  }, collection);
}

function convertSnapshotToItems (snapshot) {
  return snapshot.docs.map(doc => convertDocToItem(doc));
}

function convertDocToItem (doc) {
  const item = {};
  const data = doc.data();

  for (const field in data) {
    const value = data[field] instanceof firebase.firestore.Timestamp
      ? data[field].toDate()
      : data[field];
    item[field] = value;
  }

  return item;
};
