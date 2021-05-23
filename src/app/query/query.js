import { cloneDeep } from 'lodash';
import { Base } from './base';

export function query (state, onDouse) {
  return new Query(state, onDouse);
}
export class Query extends Base {
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
