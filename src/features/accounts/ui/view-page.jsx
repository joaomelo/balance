import { PageHeader } from '../../../app/components/list-view-top';
import { AccountsListView } from './view-list';
import { AccountAddView } from './view-add';

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
      <PageHeader title="Accounts">
        <AccountAddView
            groups={groups}
            onAdd={onAdd}
            error={errorAdd}
            isLoading={isLoading}
          />
      </PageHeader>
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
