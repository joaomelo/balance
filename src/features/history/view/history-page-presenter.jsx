import { useSelector } from '../../../app/service';
import { HistoryPageView } from './history-page-view';

export function HistoryPagePresenter ({ dependencies }) {
  const { balancesService, accountsService } = dependencies;
  const accounts = useSelector(accountsService, 'activeItems');
  const balances = useSelector(balancesService, 'activeItems');

  return (
    <HistoryPageView
      accounts={accounts}
      balances={balances}
    />
  );
}
