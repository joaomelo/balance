export async function add (items, collection, firestore) {
  if (!items || typeof items !== 'object') {
    throw new Error('Add supports only non-empty arrays or a single object');
  };

  if (Array.isArray(items) && items.length === 0) {
    throw new Error('Add do not support empty arrays');
  };

  const itemsToAdd = Array.isArray(items) ? items : [items];

  if (itemsToAdd.some(i => !i.id)) {
    throw new Error('A item "id" property is required to add items to the data repository');
  }

  const batch = firestore.batch();
  itemsToAdd.forEach(item => {
    const record = convertItemToRecord(item);
    const docRef = collection.doc(record.id);
    batch.set(docRef, record);
  });
  await batch.commit();
}

function convertItemToRecord (item) {
  const now = new Date();
  return {
    ...item,
    _deleted: false,
    _created: now,
    _updated: now
  };
}
