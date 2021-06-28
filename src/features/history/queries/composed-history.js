import { select } from '../../../app/query';

export function selectComposedHistory (
  groupsSelector,
  accountsSelector
) {
  return select(
    [
      groupsSelector,
      accountsSelector
    ],
    composedHistoryProject
  );
}

export function composedHistoryProject ([
  groups,
  accounts
]) {
  const groupsHistory = mapHistory(groups);
  const accountsHistory = mapHistory(accounts);
  return [...groupsHistory, ...accountsHistory];
}

function mapHistory (collection) {
  return collection.map(item => ({
    label: item.name,
    data: item.balances.map(b => ({ x: b.date, y: b.amount }))
  }));
}
