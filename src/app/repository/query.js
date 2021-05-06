export function igniteQuery (collection, update, unsub, filters) {
  // const firebase = ...
  // const query = mountQuery(collection, filters);

  // unsub() // da pra genrencia o unsub aqui????? sem precisar do service???
  // // cuidado pra ao usar uma variavel de modulo, pq varios repositorios vao
  // // acabar compartilhando a variavel
  // // so expoe no sevrice o que os modules vai usar!

  // const newUnsub = const queryUnsubscription = query.onSnapshot(snapshot => {
  //   const items = convertSnapshotToItems(snapshot, firebase);
  //   update({ items });
  // });

  // update({ unsub: newUnsub}, { mute: true });
}

export function connectRepositoryService (repositoryService, config) {
  const { filters, identityService } = config;
  let unsubscribe = () => null;
  identityService.subscribe(({ selectors }) => {
    unsubscribe();
    if (selectors.isSignedIn()) {
      unsubscribe = repository.subscribe(filters, items => {
        state.items = items.reduce((acc, item) => {
          acc[item.id] = { ...item };
          return acc;
        }, {});
        baseStore.invalidate();
      });
    } else {
      unsubscribe = () => null;
      state.items = [];
      baseStore.invalidate();
    }
  });

  return baseStore;
}

function mountQuery (filters = [], collection) {
  return filters.reduce((query, filter) => {
    const filterData = typeof filter === 'function' ? filter() : filter;
    const { field, operator, value } = filterData;
    return query.where(field, operator, value);
  }, collection);
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
