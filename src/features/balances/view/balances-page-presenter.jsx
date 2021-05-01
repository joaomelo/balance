import { useCase } from '../../../app/components';
import { useGetter } from '../../../app/store';
import { createErrorReport } from '../../../app/error';
import { setBalanceCase, delBalanceCase } from '../cases';
import { BalancesPageView } from './balances-page-view';

export function BalancesPagePresenter ({ dependencies }) {
  const { balancesStore, accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'activeItems', []);
  const balances = useGetter(balancesStore, 'activeItems', []);

  const [onAdd, isAdding, errorAdd] = useCase(setBalanceCase, dependencies);
  const errorsAdd = createErrorReport(errorAdd);

  const [onEdit, isEditing, errorEdit] = useCase(setBalanceCase, dependencies);
  const errorsEdit = createErrorReport(errorEdit);

  const [onDel, isDeleting] = useCase(delBalanceCase, dependencies);

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
