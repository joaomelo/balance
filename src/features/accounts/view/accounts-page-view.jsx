import { ListViewTop } from '../../../app/components';
import { AccountAddView } from './account-add-view';
import { AccountsListView } from './accounts-list-view';

export function AccountsPageView ({
  accounts,
  groups,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading
}) {
  return (
    <>
      <ListViewTop title="Accounts">
        <AccountAddView
            groups={groups}
            onAdd={onAdd}
            error={errorAdd}
            isLoading={isLoading}
          />
      </ListViewTop>
      <AccountsListView
        accounts={accounts}
        groups={groups}
        onDel={onDel}
        onEdit={onEdit}
        error={errorEdit}
        isLoading={isLoading}
      />
    </>
  );
}
