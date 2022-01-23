import { PageHeader } from "../../../libs/components/page-header";
import { PageContent } from "../../../libs/components/page-content";
import { AccountsList } from "./list";
import { AccountAdd } from "./add";

export function AccountsPage({ dependencies }) {
  return (
    <>
      <PageHeader title="Accounts">
        <AccountAdd dependencies={dependencies} />
      </PageHeader>
      <PageContent>
        <AccountsList dependencies={dependencies} />
      </PageContent>
    </>
  );
}
