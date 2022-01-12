import { useStream } from "../../../libs/hooks/stream";
import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { DateChart } from "../../../libs/components/date-chart";

export function HistoryPage({ dependencies }) {
  const { historyQuery } = dependencies;
  const history = useStream(historyQuery);

  return (
    <>
      <PageHeader title="History" />
      <PageContent justifyContent="center" alignItems="center">
        <DateChart id="balance-history" datasets={history} />
      </PageContent>
    </>
  );
}
