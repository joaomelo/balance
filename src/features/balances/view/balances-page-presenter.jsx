import { useCase } from '../../../app/components';
import { useGetter } from '../../../app/store';
import { createErrorReport } from '../../../app/error';
import { addBalanceCase } from '../cases';
import { BalancesPageView } from './balances-page-view';

export function BalancesPagePresenter ({ dependencies }) {
  const { balancesStore, accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'allItems', []);
  const balances = useGetter(balancesStore, 'allItems', []);

  const {
    run: onAdd,
    isRunning: isAdding,
    error: errorAdd
  } = useCase(addBalanceCase, dependencies);
  const errorsAdd = createErrorReport(errorAdd);

  return (
    <BalancesPageView
      accounts={accounts}
      balances={balances}
      onAdd={onAdd}
      errorsAdd={errorsAdd}
      isLoading={isAdding}
    />
  );
}
