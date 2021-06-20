import { ListViewTop } from '../../../app/components';
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
  isLoading,
  t
}) {
  return (
    <>
      <ListViewTop title="Balances">
        <BalanceAddView
          accounts={accounts}
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
          t={t}
        />
      </ListViewTop>
      <BalancesListView
        balances={balances}
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        errorEdit={errorEdit}
        isLoading={isLoading}
        t={t}
      />
    </>
  );
}
