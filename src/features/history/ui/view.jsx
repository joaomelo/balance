import { ListViewTop, DateChart } from '../../../app/components';
import styled from 'styled-components';

export function HistoryPageView ({ history }) {
  return (
    <>
      <ListViewTop title="History" />
      <DateChartWrapper>
        <DateChart
          id="balance-history"
          datasets={history}
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
