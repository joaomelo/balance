import { streamWhereUser } from "../../../services/firestore";

export function createFlatGroupsQuery(dbDriver, userIdStream) {
  const activeAccounts = dbDriver
    .collection("groups")
    .where("_deleted", "==", false)
    .orderBy("name");

  const { listStream } = streamWhereUser(userIdStream, activeAccounts);
  return listStream;
}
