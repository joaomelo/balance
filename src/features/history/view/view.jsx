import { PageHeader } from '../../../components/page-header';
import { PageContent } from '../../../components/page-content';
import { DateChart } from '../../../components/date-chart';

export function HistoryPageView ({ history }) {
  return (
    <>
      <PageHeader title="History" />
      <PageContent
        justifyContent="center"
        alignItems="center"
      >
        <DateChart
          id="balance-history"
          datasets={history}
        />
      </PageContent>
    </>
  );
}
