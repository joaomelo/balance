import { store, select } from "currentjs";
import { createUpdateStore } from "./snapshot.js";

export function streamQuery(onSnapshot, options = {}) {
  const indexedStream = streamIndexed(onSnapshot, options);
  const listStream = streamList(indexedStream);

  return {
    indexedStream,
    listStream,
  };
}

function streamIndexed(onSnapshot, options) {
  const indexedStore = store({});

  const { convert } = options;
  const updateStore = createUpdateStore(indexedStore, convert);

  indexedStore.onClose = onSnapshot(updateStore);
  return indexedStore;
}

export function streamReactiveQuery(
  observable,
  createOnSnapshot,
  options = {}
) {
  const indexedStream = streamReactiveIndexed(
    observable,
    createOnSnapshot,
    options
  );
  const listStream = streamList(indexedStream);

  return {
    indexedStream,
    listStream,
  };
}

function streamReactiveIndexed(observable, createOnSnapshot, options) {
  const { convert, emptyWhenFalsyDisabled } = options;

  let unsubscribe = () => null;
  const indexedStore = store({}, unsubscribe);
  const updateStore = createUpdateStore(indexedStore, convert);

  observable.subscribe((current) => {
    unsubscribe();
    if (current || emptyWhenFalsyDisabled) {
      const onSnapshot = createOnSnapshot(current);
      unsubscribe = onSnapshot(updateStore);
    } else {
      unsubscribe = () => null;
      indexedStore.update({});
    }
  });

  return indexedStore;
}

function streamList(indexedStream) {
  return select(indexedStream, (current) => Object.values(current));
}
