import { useSelector, useAction } from '../../../app/service';
import { createErrorReport } from '../../../app/error';
import { BalancesPageView } from './balances-page-view';

export function BalancesPagePresenter ({ dependencies }) {
  const { balancesService, accountsService, authService } = dependencies;
  const accounts = useSelector(accountsService, 'activeItems');
  const balances = useSelector(balancesService, 'activeItems');

  const [onAdd, isAdding, errorAdd] = useAction(balancesService, 'setBalanceCase', accountsService, authService);
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useAction(balancesService, 'setBalanceCase', accountsService, authService);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useAction(balancesService, 'delBalancesCase');

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
