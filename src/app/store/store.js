import { cloneDeep } from 'lodash-es';
import { Base } from './base';

export function store (state, onDouse) {
  return new Store(state, onDouse);
}

export class Store extends Base {
  constructor (state, onDouse) {
    const clonedState = cloneDeep(state);
    super(clonedState);

    this.onDouse = onDouse || (() => null);
  }

  update (state) {
    const updatedState = cloneDeep(state);
    this.subject.next(updatedState);
  };

  douse () {
    this.subject.complete();
    this.onDouse();
  }
}
