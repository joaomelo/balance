export function AccountReadView ({ account, onDel, claimEdit }) {
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
        <button onClick={() => onDel(id)}>
          del
        </button>
      </td>
    </tr>
  );
}
