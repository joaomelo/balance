import { AddAccountView } from './add';
import { ListAccountsView } from './list';

export function AccountsPage ({ dependencies }) {
  return (
    <>
      <h2>Accounts</h2>
      <AddAccountView dependencies={dependencies}/>
      <ListAccountsView dependencies={dependencies}/>
    </>
  );
}
