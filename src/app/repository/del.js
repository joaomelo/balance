export async function del (ids, collection, firestore) {
  if (!ids) {
    throw new Error('ids must be defined');
  };

  if (!(Array.isArray(ids) || typeof ids === 'string')) {
    throw new Error('ids must be non empty array or a string');
  };

  if (Array.isArray(ids) && ids.length === 0) {
    throw new Error('ids cannot be an empty array');
  };

  const idsToDel = Array.isArray(ids) ? ids : [ids];

  const batch = firestore.batch();
  idsToDel.forEach(id => {
    const docRef = collection.doc(id);
    batch.update(docRef, {
      _deleted: true,
      _updated: new Date()
    });
  });
  await batch.commit();
}
