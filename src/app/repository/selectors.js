import { select } from '../query';

export function selectItemById (query, id) {
  return select(query, current => current[id]);
}

export function selectAllItems (query) {
  return select(query, current => Object.values(current));
}

export function selectActiveItems (query) {
  return select(query, current => Object.values(current).filter(i => !i._deleted));
}
