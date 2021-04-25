import { useGetter } from '../../../app/store';
import { DelAccountView } from './del';

export function ListAccountsView ({ dependencies }) {
  const { accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'activeItems', []);

  return (
    <table>
      <thead>
        <th>Name</th>
      </thead>
      <tbody>
        {accounts.map(a =>
          <AccountReadView
            key={a.id}
            account={a}
            dependencies={dependencies}
          />
        )}
      </tbody>
    </table>
  );
}

function AccountReadView ({ account, dependencies }) {
  const { id, name } = account;
  return (
    <tr id={id}>
      <td>{name}</td>
      <td>edt</td>
      <td>
        <DelAccountView
          id={id}
          dependencies={dependencies}
        />
      </td>
    </tr>
  );
}
