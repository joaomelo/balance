import { consolidateGroupsBalances } from "./consolidate";

export function projectGroups(groups, accounts, balances) {
  const consolidatedBalances = consolidateGroupsBalances(
    groups,
    accounts,
    balances
  );

  return groups.map((group) => ({
    ...group,
    accounts: accounts.filter((a) => a.groupId === group.id),
    balances: consolidatedBalances[group.id],
  }));
}
