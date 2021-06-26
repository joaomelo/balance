import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setGroupCommand, delGroupCommand } from '../commands';
import { GroupsPageView } from './groups-page-view';

export function GroupsPagePresenter ({ dependencies }) {
  const { groupsWithRelationsSelector } = dependencies;
  const groups = useQuery(groupsWithRelationsSelector);

  const [onAdd, isAdding, errorAdd] = useCommand(dependencies, setGroupCommand);
  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setGroupCommand);
  const [onDel, isDeleting] = useCommand(dependencies, delGroupCommand);

  const { useI18n } = dependencies;
  const { t } = useI18n();

  return (
    <GroupsPageView
      groups={groups}
      onAdd={onAdd}
      errorAdd={errorAdd}
      onEdit={onEdit}
      errorEdit={errorEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
      t={t}
    />
  );
}