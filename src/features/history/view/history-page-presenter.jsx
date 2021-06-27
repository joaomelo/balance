import { useQuery } from '../../../app/query';
import { HistoryPageView } from './history-page-view';

export function HistoryPagePresenter ({ dependencies }) {
  const { accountsWithRelationsSelector } = dependencies;
  const accounts = useQuery(accountsWithRelationsSelector);

  return (
    <HistoryPageView accounts={accounts}/>
  );
}
