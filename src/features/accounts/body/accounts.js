export function projectAccounts(accounts, groups, balances) {
  return accounts.map((account) => ({
    ...account,
    groupName: mapGroupName(account, groups),
    balances: mapBalances(account, balances),
  }));
}

function mapGroupName(account, groups) {
  const group = groups.find((g) => g.id === account.groupId);
  const name = group ? group.name : null;
  return name;
}

function mapBalances(account, balances) {
  return balances.filter((b) => b.accountId === account.id);
}
