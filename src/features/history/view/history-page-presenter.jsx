import { HistoryPageView } from './history-page-view';
import { accounts, balances } from '../../../../tests/fixtures';

export function HistoryPagePresenter () {
  return (
    <HistoryPageView
      accounts={accounts}
      balances={balances}
    />
  );
}
