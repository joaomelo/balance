import { streamWhereUser } from "../../../services/firestore";

export function createFlatAccountsQuery(dbDriver, userIdStream) {
  const activeAccounts = dbDriver
    .collection("accounts")
    .where("_deleted", "==", false)
    .orderBy("name");

  const { listStream } = streamWhereUser(userIdStream, activeAccounts);
  return listStream;
}
