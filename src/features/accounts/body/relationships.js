export function projectAccountsWithRelationships (
  accounts,
  groups,
  balances
) {
  return accounts.map(account => ({
    ...account,
    groupName: mapGroupName(groups, account),
    balances: mapBalances(balances, account)
  }));
}

function mapGroupName (groups, account) {
  const group = groups.find(g => g.id === account.groupId);
  const name = group ? group.name : null;
  return name;
}

function mapBalances (balances, account) {
  return balances.filter(b => b.accountId === account.id);
}
