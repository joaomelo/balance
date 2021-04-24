export async function query (filters, collection, firebase) {
  const query = mountQuery(filters, collection);

  const snapshot = await query.get();
  const items = convertSnapshotToItems(snapshot, firebase);

  return items;
};

export function subscribe (filters, observer, collection, firebase) {
  const query = mountQuery(filters, collection);

  return query.onSnapshot(snapshot => {
    const items = convertSnapshotToItems(snapshot, firebase);
    observer(items);
  });
}

function mountQuery (filters = [], collection) {
  let query = collection;
  filters.forEach(filter => {
    const { field, operator, value } = filter;
    query = query.where(field, operator, value);
  });
  return query;
}

function convertSnapshotToItems (snapshot, firebase) {
  return snapshot.docs.map(doc => convertDocToItem(doc, firebase));
}

function convertDocToItem (doc, firebase) {
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
