import { cloneDeep } from 'lodash';
import { Base } from './base';

export function store (state, onDouse) {
  return new Store(state, onDouse);
}

export class Store extends Base {
  constructor (state, onDouse) {
    super(cloneDeep(state));
    this.onDouse = onDouse || (() => null);
  }

  update (state) {
    this.subject.next(cloneDeep(state));
  };

  douse () {
    this.subject.complete();
    this.onDouse();
  }
}
