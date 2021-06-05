import { Loading } from '../../../app/components';
import { BalanceAddView } from './balance-add-view';
import { BalancesListView } from './balances-list-view';

export function BalancesPageView ({
  balances,
  accounts,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading
}) {
  // import { createErrorReport } from '../../../app/error';
  // const errorsEdit = createErrorReport(errorEdit);

  return (
    <>
      <h2>Balances</h2>
      <BalanceAddView
        accounts={accounts}
        onAdd={onAdd}
        errors={errorAdd}
      />
      <BalancesListView
        balances={balances}
        onDel={onDel}
        onEdit={onEdit}
        errorEdit={errorEdit}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
