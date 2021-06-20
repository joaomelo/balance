import { ListViewTop } from '../../../app/components';
import { AccountAddView } from './account-add-view';
import { AccountsListView } from './accounts-list-view';

export function AccountsPageView ({
  accounts,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading,
  t
}) {
  return (
    <>
      <ListViewTop title="Accounts">
        <AccountAddView
            onAdd={onAdd}
            error={errorAdd}
            isLoading={isLoading}
            t={t}
          />
      </ListViewTop>
      <AccountsListView
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        error={errorEdit}
        isLoading={isLoading}
        t={t}
      />
    </>
  );
}
