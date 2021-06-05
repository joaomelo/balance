import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setBalanceCommand, delBalanceCommand } from '../commands';
import { BalancesPageView } from './balances-page-view';

export function BalancesPagePresenter ({ dependencies }) {
  const {
    activeAccountsSelector,
    balancesWithAccountSelector
  } = dependencies;

  const accounts = useQuery(activeAccountsSelector);
  const balances = useQuery(balancesWithAccountSelector);

  const [onAdd, isAdding, errorAdd] = useCommand(dependencies, setBalanceCommand);
  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setBalanceCommand);
  const [onDel, isDeleting] = useCommand(dependencies, delBalanceCommand);

  return (
    <BalancesPageView
      balances={balances}
      accounts={accounts}
      onAdd={onAdd}
      errorAdd={errorAdd}
      onEdit={onEdit}
      errorEdit={errorEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
    />
  );
}
