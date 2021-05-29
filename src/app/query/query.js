import { cloneDeep } from 'lodash';
import { Base } from './base';

export function query (state) {
  return new Query(state);
}
export class Query extends Base {
  constructor (state) {
    super(cloneDeep(state));
  }

  update (state) {
    this.subject.next(cloneDeep(state));
  };
}
