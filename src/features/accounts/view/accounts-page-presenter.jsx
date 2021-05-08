import { useSelector, useAction } from '../../../app/service';
import { createErrorReport } from '../../../app/error';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const { accountsService, identityService } = dependencies;
  const accounts = useSelector(accountsService, 'activeItems');

  const [onAdd, isAdding, errorAdd] = useAction(accountsService, 'setAccountCase', identityService);
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useAction(accountsService, 'setAccountCase', identityService);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useAction(accountsService, 'delAccountCase');

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
