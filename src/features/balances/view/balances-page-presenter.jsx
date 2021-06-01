import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { createErrorReport } from '../../../app/error';
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
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setBalanceCommand);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useCommand(dependencies, delBalanceCommand);

  return (
    <BalancesPageView
      balances={balances}
      accounts={accounts}
      onAdd={onAdd}
      errorsAdd={errorsAdd}
      onEdit={onEdit}
      errorsEdit={errorsEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
    />
  );
}
