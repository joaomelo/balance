import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { BalanceAddView } from "./view-add";
import { BalancesListView } from "./view-list";

export function BalancesPageView({
  balances,
  accounts,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading,
}) {
  return (
    <>
      <PageHeader title="Balances">
        <BalanceAddView
          accounts={accounts}
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
        />
      </PageHeader>
      <PageContent>
        <BalancesListView
          balances={balances}
          accounts={accounts}
          onDel={onDel}
          onEdit={onEdit}
          errorEdit={errorEdit}
          isLoading={isLoading}
        />
      </PageContent>
    </>
  );
}
