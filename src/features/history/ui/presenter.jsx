import { useQuery } from '../../../libs/query';
import { HistoryPageView } from './view';

export function HistoryPagePresenter ({ dependencies }) {
  const { composedHistorySelector } = dependencies;
  const history = useQuery(composedHistorySelector);

  return (
    <HistoryPageView history={history}/>
  );
}
