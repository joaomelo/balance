export function AccountsListView ({
  accounts,
  onDel
}) {
  return (
    <table>
      <thead>
        <th>Name</th>
        <th colSpan="2">Actions</th>
      </thead>
      <tbody>
        {accounts.map(a =>
          <AccountReadView
            key={a.id}
            account={a}
            onDel={onDel}
          />
        )}
      </tbody>
    </table>
  );
}

function AccountReadView ({ account, onDel }) {
  const { id, name } = account;
  const onEdit = () => console.log(id);
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button onClick={onEdit}>
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
