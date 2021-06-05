import { AccountView } from './account-view';

export function AccountsListView ({
  accounts,
  onDel,
  onEdit,
  errorEdit
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(a =>
          <AccountView
            key={a.id}
            account={a}
            onDel={onDel}
            onClaimEdit={id => console.log({ edit: id })}
          />
        )}
      </tbody>
    </table>
  );
}
