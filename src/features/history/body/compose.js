export function projectComposedHistory (groups, accounts) {
  const groupsHistory = mapCollectionHistory(groups);
  const accountsHistory = mapCollectionHistory(accounts);
  return [...groupsHistory, ...accountsHistory];
}

function mapCollectionHistory (collection) {
  return collection.map(item => ({
    label: item.name,
    data: item.balances.map(b => ({ x: b.date, y: b.amount }))
  }));
}
