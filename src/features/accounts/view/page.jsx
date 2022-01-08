import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { AccountsListView } from "./list";
import { AccountAddView } from "./add";

export function AccountsPageView({
  accounts,
  groups,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading,
}) {
  return (
    <>
      <PageHeader title="Accounts">
        <AccountAddView
          groups={groups}
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
        />
      </PageHeader>
      <PageContent>
        <AccountsListView
          accounts={accounts}
          groups={groups}
          onDel={onDel}
          onEdit={onEdit}
          error={errorEdit}
          isLoading={isLoading}
        />
      </PageContent>
    </>
  );
}
