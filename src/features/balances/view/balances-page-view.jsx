import { Loading } from '../../../app/components';
import { BalancesAddView } from './balance-add-view';
import { BalancesListView } from './balances-list-view';

export function BalancesPageView ({
  accounts,
  balances,
  onAdd,
  errorsAdd,
  isLoading
}) {
  return (
    <>
      <h2>Balances</h2>
      <BalancesAddView
        accounts={accounts}
        onAdd={onAdd}
        errors={errorsAdd}
      />
      <BalancesListView
        balances={balances}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
