import { cloneDeep } from 'lodash';
import { Subject } from './subject';

export function query (state) {
  return new Query(state);
}
export class Query extends Subject {
  update (state) {
    this.baseObservable.next(cloneDeep(state));
  };
}
