import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { AccountsPageView } from "./page";

export function AccountsPagePresenter({ dependencies }) {
  const {
    accountsWithRelationshipsSelector,
    balancesWithRelationshipsSelector,
    groupsWithRelationshipsSelector,
    accountsActions,
    balancesActions,
    userIdStream,
  } = dependencies;

  const accounts = useStream(accountsWithRelationshipsSelector);
  const balances = useStream(balancesWithRelationshipsSelector);
  const groups = useStream(groupsWithRelationshipsSelector);
  const userId = useStream(userIdStream);

  const commandsDependencies = {
    accounts,
    balances,
    userId,
    accountsActions,
    balancesActions,
  };
  const [onAdd, isAdding, errorAdd] = useCommand(commandsDependencies);
  const [onEdit, isEditing, errorEdit] = useCommand(commandsDependencies);
  const [onDel, isDeleting] = useCommand(commandsDependencies);

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
