import { streamWhereUser } from "../../../services/firestore";

export function createFlatBalancesQuery(dbDriver, userIdStream) {
  const activeAccounts = dbDriver
    .collection("balances")
    .where("_deleted", "=", false)
    .orderBy("date", "desc");

  const { listStream } = streamWhereUser(userIdStream, activeAccounts);
  return listStream;
}
