import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { BalancesPageView } from "./view-page";

export function BalancesPagePresenter({ dependencies }) {
  const { accountsQuery, balancesQuery, balancesCommands } = dependencies;

  const accounts = useStream(accountsQuery);
  const balances = useStream(balancesQuery);

  const [onAdd, isAdding, errorAdd] = useCommand(balancesCommands.set);
  const [onEdit, isEditing, errorEdit] = useCommand(balancesCommands.set);
  const [onDel, isDeleting] = useCommand(balancesCommands.del);

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
