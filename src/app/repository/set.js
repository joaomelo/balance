export async function set (collection, items) {
  if (!items || typeof items !== 'object') {
    throw new Error('Set supports only non-empty arrays or a single object');
  };

  if (Array.isArray(items) && items.length === 0) {
    throw new Error('Set do not support empty arrays');
  };

  const itemsToSet = Array.isArray(items) ? items : [items];

  if (itemsToSet.some(i => !i.id)) {
    throw new Error('A item "id" property is required to set items to the data repository');
  }

  const batch = collection.firestore.batch();
  itemsToSet.forEach(item => {
    const record = convertItemToRecord(item);
    const docRef = collection.doc(record.id);
    batch.set(docRef, record);
  });
  await batch.commit();
}

function convertItemToRecord (item) {
  const now = new Date();
  return {
    _deleted: false,
    _created: now,
    ...item, // if editing, this oder allow only "updated" to override original property.
    _updated: now
  };
}
