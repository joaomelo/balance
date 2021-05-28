// import { useQuery, useCommand } from '../../../app/hooks';
// import { createErrorReport } from '../../../app/error';
import { BalancesPageView } from './balances-page-view';

export function BalancesPagePresenter ({ dependencies }) {
  // const { balancesService, accountsService, authService } = dependencies;
  // const accounts = useQuery(accountsService, 'activeItems');
  // const balances = useQuery(balancesService, 'activeItems');

  // const [onAdd, isAdding, errorAdd] = useCommand(balancesService, 'setBalanceCase', accountsService, authService);
  // const errorsAdd = createErrorReport(errorAdd);

  // const [onEdit, isEditing, errorEdit] = useCommand(balancesService, 'setBalanceCase', accountsService, authService);
  // const errorsEdit = createErrorReport(errorEdit);

  // const [onDel, isDeleting] = useCommand(balancesService, 'delBalancesCase');

  return (
    <BalancesPageView />
    // <BalancesPageView
    //   balances={balances}
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
