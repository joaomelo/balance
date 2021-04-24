import { add } from './add';
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
    add: items => add(items, collection, firestore),
    query: filters => query(filters, collection, firebase),
    subscribe: (filter, observer) => subscribe(filter, observer, collection, firebase)
  };
}
