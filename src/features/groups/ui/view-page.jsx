import { PageHeader } from '../../../app/components/list-view-top';
import { GroupAddView } from './view-add';
import { GroupsListView } from './view-list';

export function GroupsPageView ({
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
      <PageHeader title="Groups">
        <GroupAddView
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
        />
      </PageHeader>
      <GroupsListView
        groups={groups}
        onDel={onDel}
        onEdit={onEdit}
        error={errorEdit}
        isLoading={isLoading}
      />
    </>
  );
}
