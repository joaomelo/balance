import { useQuery } from '../../../app/query';
import { HistoryPageView } from './history-page-view';

export function HistoryPagePresenter ({ dependencies }) {
  const { composedHistorySelector } = dependencies;
  const history = useQuery(composedHistorySelector);

  return (
    <HistoryPageView history={history}/>
  );
}
