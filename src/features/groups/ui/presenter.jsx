import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setGroupCommand, delGroupCommand } from '../commands';
import { selectGroupsWithRelationships } from '../queries';
import { GroupsPageView } from './view-page';

export function GroupsPagePresenter ({ dependencies }) {
  const {
    activeGroupsSelector,
    activeAccountsSelector,
    activeBalancesSelector
  } = dependencies;

  const groupsSelector = selectGroupsWithRelationships(
    activeGroupsSelector,
    activeAccountsSelector,
    activeBalancesSelector
  );

  const groups = useQuery(groupsSelector);
  const accounts = useQuery(activeAccountsSelector);

  const [onAdd, isAdding, errorAdd] = useCommand(dependencies, setGroupCommand);
  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setGroupCommand);
  const [onDel, isDeleting] = useCommand(dependencies, delGroupCommand);

  const { useI18n } = dependencies;
  const { t } = useI18n();

  return (
    <GroupsPageView
      groups={groups}
      accounts={accounts}
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
