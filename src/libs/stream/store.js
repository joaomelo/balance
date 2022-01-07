import { Stream } from "./stream.js";

export function store(initialState, onClose) {
  return new Store(initialState, onClose);
}

class Store extends Stream {
  update(state) {
    this.observable.next(state);
  }
}
