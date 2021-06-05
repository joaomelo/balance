import { asUtcIsoString, camelCase } from '../../../app/helpers';

export function AccountView ({
  account,
  onDel,
  onClaimEdit
}) {
  const { id, name, date, amount } = account;
  return (
    <tr>
      <td>{name}</td>
      <td>{date ? asUtcIsoString(date) : '-'}</td>
      <td>{amount || '-'}</td>
      <td>
        <button onClick={() => onClaimEdit(id)}>
          edt
        </button>
      </td>
      <td>
        <button
          id={camelCase('button', 'del', name)}
          onClick={() => onDel({ id })}
        >
          del
        </button>
      </td>
    </tr>
  );
}
