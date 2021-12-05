import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from './subject';

export function select (sources, project) {
  return new Selector(sources, project);
}

export class Selector extends Subject {
  constructor (subjects, project) {
    super();

    const combinedSources = Array.isArray(subjects)
      ? combineLatest(subjects.map(s => s.baseObservable))
      : subjects.baseObservable;
    const projectObservable = combinedSources.pipe(map(project));

    projectObservable.subscribe(this.baseObservable);
  }
}
