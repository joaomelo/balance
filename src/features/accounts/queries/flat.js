import { streamReactiveQuery } from "@joaomelo/stream-fire";

export function createFlatAccountsQuery(dbDriver, userIdStream) {
  const createOnSnapshot = (userId) => (observer) => {
    const query = dbDriver
      .collection("accounts")
      .where("_deleted", "=", false)
      .where("user", "=", userId)
      .orderBy("name");
    return query.onSnapshot(observer);
  };

  const { listStream } = streamReactiveQuery(userIdStream, createOnSnapshot);
  return listStream;
}
