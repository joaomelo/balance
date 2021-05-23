// import { sortBy } from 'lodash';

// import { DateChart } from '../../../app/components';

export function HistoryPageView ({ accounts, balances }) {
  // const sortedAccounts = sortBy(accounts, ['name']);
  // const sortedBalances = sortBy(balances, ['date']);

  // const datasets = sortedAccounts.map(a => ({
  //   label: a.name,
  //   data: sortedBalances
  //     .filter(b => b.accountId === a.id)
  //     .map(b => ({ x: b.date, y: b.amount }))
  // }));

  return (
    <>
      <h2>History</h2>
      {/* <DateChart datasets={datasets}/> */}
    </>
  );
}
