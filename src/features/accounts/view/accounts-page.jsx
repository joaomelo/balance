import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { AccountsList } from "./list";
import { AccountAdd } from "./add";

export function AccountsPage({ dependencies }) {
  const { accountsQuery, accountsCommands, groupsQuery } = dependencies;

  const accounts = useStream(accountsQuery);
  const groups = useStream(groupsQuery);

  const [add, isAdding, errorAdd] = useCommand(accountsCommands.set);
  const [edit, isEditing, errorEdit] = useCommand(accountsCommands.set);
  const [del, isDeleting] = useCommand(accountsCommands.del);

  return (
    <>
      <PageHeader title="Accounts">
        <AccountAdd
          groups={groups}
          onAdd={add}
          error={errorAdd}
          isLoading={isAdding}
        />
      </PageHeader>
      <PageContent>
        <AccountsList
          accounts={accounts}
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
