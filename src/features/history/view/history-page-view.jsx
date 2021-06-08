import { DateChart } from '../../../app/components';
import styled from 'styled-components';

export function HistoryPageView ({ accounts }) {
  const datasets = accounts.map(a => ({
    label: a.name,
    data: a.balances.map(b => ({ x: b.date, y: b.amount }))
  }));

  return (
    <>
      <h2>History</h2>
      <DateChartExpanded
        id="balance-history"
        datasets={datasets}
      />
    </>
  );
}

const DateChartExpanded = styled(DateChart)`
  width: 100%;
  flex: 1;
  padding: var(--size-200);
  padding-bottom: var(--size-500);
`;
