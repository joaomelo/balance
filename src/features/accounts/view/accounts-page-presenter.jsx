import { useCase } from '../../../app/hooks';
import { useGetter } from '../../../app/store';
import { createErrorReport } from '../../../app/error';
import { addAccountCase, delAccountCase } from '../cases';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const { accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'activeItems', []);

  const {
    run: onAdd,
    isRunning: isAdding,
    error: errorAdd
  } = useCase(addAccountCase, dependencies);
  const errorsAdd = createErrorReport(errorAdd);

  const {
    run: onDel,
    isRunning: isDeleting
  } = useCase(delAccountCase, dependencies);

  return (
    <AccountsPageView
      accounts={accounts}
      onAdd={onAdd}
      errorsAdd={errorsAdd}
      onDel={onDel}
      isLoading={isAdding || isDeleting}
    />
  );
}
