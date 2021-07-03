import { ListViewTop } from '../../../app/components';
import { GroupAddView } from './view-add';
import { GroupsListView } from './view-list';

export function GroupsPageView ({
  groups,
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
      <ListViewTop title="Groups">
        <GroupAddView
          accounts={accounts}
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
          t={t}
        />
      </ListViewTop>
      <GroupsListView
        groups={groups}
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
