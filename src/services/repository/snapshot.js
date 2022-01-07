export function createUpdateStore(store, convert) {
  const resolvedConvert = resolveConvert(convert);

  return (snapshot) => {
    const indexedItems = snapshot.docs.reduce((acc, doc) => {
      const item = resolvedConvert(doc);
      const index = item.id || doc.id;
      acc[index] = item;
      return acc;
    }, {});

    store.update(indexedItems);
  };
}

function resolveConvert(convert) {
  if (typeof convert === "function") return convert;
  if (convert) return convertDocToStreamItem;
  return (doc) => doc.data();
}

function convertDocToStreamItem(doc) {
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
