// import { useStore } from '../../../app/service';
import { HistoryPageView } from './history-page-view';

export function HistoryPagePresenter ({ dependencies }) {
  // const { balancesService, accountsService } = dependencies;
  // const accounts = useStore(accountsService, 'activeItems');
  // const balances = useStore(balancesService, 'activeItems');

  return (
    <HistoryPageView />
    // <HistoryPageView
    //   accounts={accounts}
    //   balances={balances}
    // />
  );
}
