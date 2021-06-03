import { Loading } from '../../../app/components';
import { BalanceAddView } from './balance-add-view';
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
      <BalanceAddView
        accounts={accounts}
        onAdd={onAdd}
        errors={errorsAdd}
      />
      <BalancesListView
        accounts={accounts}
        balances={balances}
        onDel={onDel}
        onEdit={onEdit}
        errorsEdit={errorsEdit}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
