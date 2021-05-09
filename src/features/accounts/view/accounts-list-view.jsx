import { useState } from 'react';
import { AccountReadView } from './account-read-view';
import { AccountEditView } from './account-edit-view';

export function AccountsListView ({ accounts, onDel, onEdit, errorsEdit }) {
  const [idOnEdit, claimEdit] = useState(null);
  const releaseEdit = () => claimEdit(null);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(a =>
          <AccountView
            key={a.id}
            account={a}
            onDel={onDel}
            onEdit={onEdit}
            errorsEdit={errorsEdit}
            idOnEdit={idOnEdit}
            claimEdit={claimEdit}
            releaseEdit={releaseEdit}
          />
        )}
      </tbody>
    </table>
  );
}

function AccountView ({ idOnEdit, ...props }) {
  return idOnEdit === props.account.id
    ? <AccountEditView {...props} />
    : <AccountReadView {...props} />;
}
