import { ListViewTop } from '../../../app/components/list-view-top';
import { BalanceAddView } from './view-add';
import { BalancesListView } from './view-list';

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
  return (
    <>
      <ListViewTop title="Balances">
        <BalanceAddView
          accounts={accounts}
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
        />
      </ListViewTop>
      <BalancesListView
        balances={balances}
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        errorEdit={errorEdit}
        isLoading={isLoading}
      />
    </>
  );
}
