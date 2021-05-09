import { useSelector, useAction } from '../../../app/service';
import { createErrorReport } from '../../../app/error';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const { accountsService, balancesService, authService } = dependencies;
  const accounts = useSelector(accountsService, 'activeItems');

  const [onAdd, isAdding, errorAdd] = useAction(accountsService, 'setAccountCase', authService);
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useAction(accountsService, 'setAccountCase', authService);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useAction(accountsService, 'delAccountCase', balancesService);

  return (
    <AccountsPageView
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
