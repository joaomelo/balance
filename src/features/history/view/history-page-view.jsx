import { DateChart } from '../../../app/components';

export function HistoryPageView ({ accounts }) {
  const datasets = accounts.map(a => ({
    label: a.name,
    data: a.balances.map(b => ({ x: b.date, y: b.amount }))
  }));

  return (
    <>
      <h2>History</h2>
      <DateChart
        id="balance-history"
        datasets={datasets}
      />
    </>
  );
}
