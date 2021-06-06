import { useQuery } from '../../../app/query';
import { HistoryPageView } from './history-page-view';

export function HistoryPagePresenter ({ dependencies }) {
  const { accountsWithBalancesSelector } = dependencies;
  const accounts = useQuery(accountsWithBalancesSelector);

  return (
    <HistoryPageView accounts={accounts}/>
  );
}
