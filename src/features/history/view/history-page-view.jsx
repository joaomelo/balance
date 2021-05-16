import { LineChart } from '../../../app/components';

export function HistoryPageView ({ accounts, balances }) {
  const dataSets = accounts.map(a => ({
    account: a.name,
    balances: balances.filter(b => b.accountId === a.id)
  }));

  return (
    <>
      <h2>History</h2>
      <LineChart dataSets={dataSets}/>
    </>
  );
}
