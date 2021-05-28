// import { useQuery } from '../../../app/service';
import { HistoryPageView } from './history-page-view';

export function HistoryPagePresenter ({ dependencies }) {
  // const { balancesService, accountsService } = dependencies;
  // const accounts = useQuery(accountsService, 'activeItems');
  // const balances = useQuery(balancesService, 'activeItems');

  return (
    <HistoryPageView />
    // <HistoryPageView
    //   accounts={accounts}
    //   balances={balances}
    // />
  );
}
