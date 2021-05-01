import { set } from './set';
import { del } from './del';
import { query, subscribe } from './query';

export function adaptFirestore (config) {
  return {
    repository: name => collection(name, config)
  };
}

function collection (name, config) {
  const { firestore, firebase } = config;
  const collection = firestore.collection(name);

  return {
    set: items => set(items, collection, firestore),
    del: ids => del(ids, collection, firestore),
    query: filters => query(filters, collection, firebase),
    subscribe: (filter, observer) => subscribe(filter, observer, collection, firebase)
  };
}
