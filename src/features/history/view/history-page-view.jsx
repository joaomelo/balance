import { ListViewTop, DateChart } from '../../../app/components';
import styled from 'styled-components';

export function HistoryPageView ({ accounts }) {
  const datasets = accounts.map(a => ({
    label: a.name,
    data: a.balances.map(b => ({ x: b.date, y: b.amount }))
  }));

  return (
    <>
      <ListViewTop title="History" />
      <DateChartWrapper>
        <DateChart
          id="balance-history"
          datasets={datasets}
        />
      </DateChartWrapper>
    </>
  );
}

const DateChartWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  padding: var(--size-200);
  padding-bottom: var(--size-500);
`;
