import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { GroupsPageView } from "./view-page";

export function GroupsPagePresenter({ dependencies }) {
  const { groupsCommands, groupsQuery } = dependencies;

  const groups = useStream(groupsQuery);

  const [onAdd, isAdding, errorAdd] = useCommand(groupsCommands.set);
  const [onEdit, isEditing, errorEdit] = useCommand(groupsCommands.set);
  const [onDel, isDeleting] = useCommand(groupsCommands.del);

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
