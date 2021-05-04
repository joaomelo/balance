import { useCase } from '../../../app/components';
import { useSelector } from '../../../app/store';
import { createErrorReport } from '../../../app/error';
import { setAccountCase, delAccountCase } from '../cases';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const { accountsStore } = dependencies;
  const accounts = useSelector(accountsStore, 'activeItems', []);

  const [onAdd, isAdding, errorAdd] = useCase(setAccountCase, dependencies);
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useCase(setAccountCase, dependencies);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useCase(delAccountCase, dependencies);

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
