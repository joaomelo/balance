import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { setAccountCommand, delAccountCommand } from "../commands";
import { AccountsPageView } from "./view-page";

export function AccountsPagePresenter({ dependencies }) {
  const {
    accountsWithRelationshipsSelector,
    balancesWithRelationshipsSelector,
    groupsWithRelationshipsSelector,
    accountsMutations,
    balancesMutations,
    userIdStream,
  } = dependencies;

  const accounts = useStream(accountsWithRelationshipsSelector);
  console.log({ accounts, accountsWithRelationshipsSelector });
  const balances = useStream(balancesWithRelationshipsSelector);
  const groups = useStream(groupsWithRelationshipsSelector);
  const userId = useStream(userIdStream);

  const commandsDependencies = {
    accounts,
    balances,
    userId,
    accountsMutations,
    balancesMutations,
  };
  const [onAdd, isAdding, errorAdd] = useCommand(
    commandsDependencies,
    setAccountCommand
  );
  const [onEdit, isEditing, errorEdit] = useCommand(
    commandsDependencies,
    setAccountCommand
  );
  const [onDel, isDeleting] = useCommand(
    commandsDependencies,
    delAccountCommand
  );

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
