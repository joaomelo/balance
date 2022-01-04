import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { setBalanceCommand, delBalanceCommand } from "../commands";
import { BalancesPageView } from "./view-page";

export function BalancesPagePresenter({ dependencies }) {
  const {
    accountsWithRelationshipsSelector,
    balancesWithRelationshipsSelector,
    userIdStream,
    balancesActions,
  } = dependencies;

  const accounts = useStream(accountsWithRelationshipsSelector);
  const balances = useStream(balancesWithRelationshipsSelector);
  const userId = useStream(userIdStream);

  const commandsDependencies = {
    balancesActions,
    accounts,
    balances,
    userId,
  };

  const [onAdd, isAdding, errorAdd] = useCommand(
    commandsDependencies,
    setBalanceCommand
  );

  const [onEdit, isEditing, errorEdit] = useCommand(
    commandsDependencies,
    setBalanceCommand
  );

  const [onDel, isDeleting] = useCommand(
    commandsDependencies,
    delBalanceCommand
  );

  return (
    <BalancesPageView
      balances={balances}
      accounts={accounts}
      onAdd={onAdd}
      errorAdd={errorAdd}
      onEdit={onEdit}
      errorEdit={errorEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
    />
  );
}
