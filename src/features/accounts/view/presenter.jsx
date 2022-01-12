import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { AccountsPageView } from "./page";

export function AccountsPagePresenter({ dependencies }) {
  const { accountsQuery, accountsCommands, groupsQuery } = dependencies;

  const accounts = useStream(accountsQuery);
  const groups = useStream(groupsQuery);

  const [onAdd, isAdding, errorAdd] = useCommand(accountsCommands.set);
  const [onEdit, isEditing, errorEdit] = useCommand(accountsCommands.set);
  const [onDel, isDeleting] = useCommand(accountsCommands.del);

  return (
    <AccountsPageView
      accounts={accounts}
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
