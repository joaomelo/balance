import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Stream } from "./stream.js";

export function select(sources, project, initialState, onClose) {
  return new Selector(sources, project, initialState, onClose);
}

class Selector extends Stream {
  constructor(sources, project, initialState, onClose) {
    super(initialState, onClose);

    const latestObservable = Array.isArray(sources)
      ? combineLatest(sources.map((s) => s.observable))
      : sources.observable;
    const projectObservable = latestObservable.pipe(map(project));

    projectObservable.subscribe(this.observable);
  }
}
