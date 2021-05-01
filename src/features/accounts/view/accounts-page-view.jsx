import { Loading } from '../../../app/components';
import { AccountAddView } from './account-add-view';
import { AccountsListView } from './accounts-list-view';

export function AccountsPageView ({
  accounts,
  onAdd,
  errorsAdd,
  onEdit,
  errorsEdit,
  onDel,
  isLoading
}) {
  return (
    <>
      <h2>Accounts</h2>
      <AccountAddView
        onAdd={onAdd}
        errors={errorsAdd}
      />
      <AccountsListView
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        errorsEdit={errorsEdit}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
