import { Loading } from '../../../app/components';
import { AccountAddView } from './account-add-view';
import { AccountsListView } from './accounts-list-view';

export function AccountsPageView ({
  accounts,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading
}) {
  return (
    <>
      <h2>Accounts</h2>
      <AccountAddView
        onAdd={onAdd}
        error={errorAdd}
      />
      <AccountsListView
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        errorEdit={errorEdit}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
