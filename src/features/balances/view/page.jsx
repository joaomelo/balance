import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { BalanceAdd } from "./add";
import { BalancesList } from "./list";

export function BalancesPage({ dependencies }) {
  const { accountsQuery, balancesQuery, balancesCommands } = dependencies;

  const accounts = useStream(accountsQuery);
  const balances = useStream(balancesQuery);

  const [add, isAdding, errorAdd] = useCommand(balancesCommands.set);
  const [edit, isEditing, errorEdit] = useCommand(balancesCommands.set);
  const [del, isDeleting] = useCommand(balancesCommands.del);

  return (
    <>
      <PageHeader title="Balances">
        <BalanceAdd
          accounts={accounts}
          onAdd={add}
          error={errorAdd}
          isLoading={isAdding}
        />
      </PageHeader>
      <PageContent>
        <BalancesList
          balances={balances}
          accounts={accounts}
          onDel={del}
          onEdit={edit}
          errorEdit={errorEdit}
          isLoading={isAdding || isEditing || isDeleting}
        />
      </PageContent>
    </>
  );
}
