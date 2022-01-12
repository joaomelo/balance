import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { GroupAdd } from "./add";
import { GroupsList } from "./list";

export function GroupsPage({ dependencies }) {
  const { groupsCommands, groupsQuery } = dependencies;

  const groups = useStream(groupsQuery);

  const [add, isAdding, errorAdd] = useCommand(groupsCommands.set);
  const [edit, isEditing, errorEdit] = useCommand(groupsCommands.set);
  const [del, isDeleting] = useCommand(groupsCommands.del);

  return (
    <>
      <PageHeader title="Groups">
        <GroupAdd onAdd={add} error={errorAdd} isLoading={isAdding} />
      </PageHeader>
      <PageContent>
        <GroupsList
          groups={groups}
          onDel={del}
          onEdit={edit}
          error={errorEdit}
          isLoading={isAdding || isEditing || isDeleting}
        />
      </PageContent>
    </>
  );
}
