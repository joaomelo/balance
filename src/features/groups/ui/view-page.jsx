import { PageHeader } from '../../../app/components/page-header';
import { PageContent } from '../../../app/components/page-content';
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
      <PageContent>
        <GroupsListView
          groups={groups}
          onDel={onDel}
          onEdit={onEdit}
          error={errorEdit}
          isLoading={isLoading}
        />
      </PageContent>
    </>
  );
}
