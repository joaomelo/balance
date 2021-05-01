import { Loading } from '../../../app/components';
import { BalancesAddView } from './balance-add-view';
import { BalancesListView } from './balances-list-view';

export function BalancesPageView ({
  balances,
  accounts,
  onAdd,
  errorsAdd,
  onEdit,
  errorsEdit,
  onDel,
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
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        errorsEdit={errorsEdit}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
