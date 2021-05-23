// import { useStore, useCommand } from '../../../app/hooks';
// import { createErrorReport } from '../../../app/error';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  // const { accountsService, balancesService, authService } = dependencies;
  // const accounts = useStore(accountsService, 'accountsWithLatestBalance', balancesService);

  // const [onAdd, isAdding, errorAdd] = useCommand(accountsService, 'setAccountCase', authService);
  // const errorsAdd = createErrorReport(errorAdd);

  // const [onEdit, isEditing, errorEdit] = useCommand(accountsService, 'setAccountCase', authService);
  // const errorsEdit = createErrorReport(errorEdit);

  // const [onDel, isDeleting] = useCommand(accountsService, 'delAccountCase', balancesService);

  return (
    <AccountsPageView />
    // <AccountsPageView
    //   accounts={accounts}
    //   onAdd={onAdd}
    //   errorsAdd={errorsAdd}
    //   onEdit={onEdit}
    //   errorsEdit={errorsEdit}
    //   onDel={onDel}
    //   isLoading={isAdding || isDeleting || isEditing}
    // />
  );
}
