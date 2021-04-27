import { useState } from 'react';

export function AccountsListView ({ accounts, onDel }) {
  const [idOnEdit, claimEdit] = useState(null);
  const releaseEdit = () => claimEdit(null);

  return (
    <table>
      <thead>
        <th>Name</th>
        <th colSpan="2">Actions</th>
      </thead>
      <tbody>
        {accounts.map(a =>
          <AccountView
            key={a.id}
            account={a}
            onDel={onDel}
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

function AccountReadView ({ account, onDel, claimEdit }) {
  const { id, name } = account;
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button onClick={() => claimEdit(id)}>
          edt
        </button>
      </td>
      <td>
        <button onClick={() => onDel({ id })}>
          del
        </button>
      </td>
    </tr>
  );
}

function AccountEditView ({ account, releaseEdit }) {
  const { id, name } = account;
  const onSave = () => console.log({ save: id });
  return (
    <tr>
      <td>editing: {name}</td>
      <td>
        <button onClick={onSave}>
          sav
        </button>
      </td>
      <td>
        <button onClick={releaseEdit}>
          can
        </button>
      </td>
    </tr>
  );
}
