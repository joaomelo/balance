import { select } from "@joaomelo/stream";

export function selectItemById(query, id) {
  return select(query, (current) => current[id]);
}

export function selectAllItems(query) {
  return select(query, (current) => Object.values(current));
}

export function selectActiveItems(query) {
  const temp = select(query, (current) => {
    return Object.values(current).filter((i) => !i._deleted);
  });
  console.log({ query: Object.values(query.current), temp });
  return temp;
}
