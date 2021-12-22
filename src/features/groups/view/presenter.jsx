import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { setGroupCommand, delGroupCommand } from "../commands";
import { GroupsPageView } from "./view-page";

export function GroupsPagePresenter({ dependencies }) {
  const {
    accountsMutations,
    accountsWithRelationshipsSelector,
    groupsMutations,
    groupsWithRelationshipsSelector,
    userIdSelector,
  } = dependencies;

  const accounts = useStream(accountsWithRelationshipsSelector);
  const groups = useStream(groupsWithRelationshipsSelector);
  const userId = useStream(userIdSelector);

  const commandsDependencies = {
    accountsMutations,
    accounts,
    groupsMutations,
    groups,
    userId,
  };

  const [onAdd, isAdding, errorAdd] = useCommand(
    commandsDependencies,
    setGroupCommand
  );

  const [onEdit, isEditing, errorEdit] = useCommand(
    commandsDependencies,
    setGroupCommand
  );

  const [onDel, isDeleting] = useCommand(commandsDependencies, delGroupCommand);

  return (
    <GroupsPageView
      groups={groups}
      onAdd={onAdd}
      errorAdd={errorAdd}
      onEdit={onEdit}
      errorEdit={errorEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
    />
  );
}
