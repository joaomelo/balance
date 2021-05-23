import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Base } from './base';

export function select (sources, project) {
  const subject = Array.isArray(sources)
    ? combineLatest(sources.map(s => s.subject))
    : sources.subject;
  const observable = subject.pipe(map(project));

  return new Selector(observable);
}

export class Selector extends Base {
  constructor (observable) {
    super();
    observable.subscribe(this.subject);
  }
}
