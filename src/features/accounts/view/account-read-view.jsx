import { asUtcIsoString } from '../../../app/helpers';

export function AccountReadView ({ account, onDel, claimEdit }) {
  const { id, name, date, amount } = account;
  return (
    <tr>
      <td>{name}</td>
      <td>{date ? asUtcIsoString(date) : '-'}</td>
      <td>{amount || '-'}</td>
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
