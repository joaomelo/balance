import { PageHeader } from '../../../app/components/page-header';
import { PageContent } from '../../../app/components/page-content';
import { DateChart } from '../../../app/components/date-chart';

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
