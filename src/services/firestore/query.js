import { store, select } from "../../libs/stream";

export function streamWhereUser(userIdStream, query) {
  const indexedStream = streamIndexed(userIdStream, query);
  const listStream = select(indexedStream, (current) => Object.values(current));

  return {
    indexedStream,
    listStream,
  };
}

function streamIndexed(userIdStream, query) {
  let unsubscribe = () => null;
  const indexedStore = store({}, unsubscribe);
  const updateStore = createUpdateStore(indexedStore);

  userIdStream.subscribe((userId) => {
    unsubscribe();
    if (userId) {
      const userQuery = query.where("user", "==", userId);
      unsubscribe = userQuery.onSnapshot(updateStore);
    } else {
      unsubscribe = () => null;
      indexedStore.update({});
    }
  });

  return indexedStore;
}

function createUpdateStore(store) {
  return (snapshot) => {
    const indexedItems = snapshot.docs.reduce((acc, doc) => {
      const item = convertDocToItem(doc);
      const index = item.id || doc.id;
      acc[index] = item;
      return acc;
    }, {});

    store.update(indexedItems);
  };
}

function convertDocToItem(doc) {
  const isTimestamp = (value) => !!value.toDate;

  const docData = doc.data();
  const item = Object.entries(docData).reduce((item, [field, value]) => {
    const parsedValue = isTimestamp(value) ? value.toDate() : value;
    item[field] = parsedValue;
    return item;
  }, {});
  if (!item.id) item.id = doc.id;
  return item;
}
