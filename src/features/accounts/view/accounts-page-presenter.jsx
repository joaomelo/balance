import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { createErrorReport } from '../../../app/error';
import { setAccountCommand, delAccountCommand } from '../commands';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const { accountsWithBalancesSelector } = dependencies;
  const accounts = useQuery(accountsWithBalancesSelector);

  const [onAdd, isAdding, errorAdd] = useCommand(dependencies, setAccountCommand);
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setAccountCommand);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useCommand(dependencies, delAccountCommand);

  return (
    <AccountsPageView
      accounts={Object.values(accounts)}
      onAdd={onAdd}
      errorsAdd={errorsAdd}
      onEdit={onEdit}
      errorsEdit={errorsEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
    />
  );
}
