import { asUtcIsoString, camelCase } from '../../../app/helpers';

export function BalancesListItemView ({
  balance,
  onDel,
  onClaimEdit
}) {
  const { id, accountName, date, amount } = balance;
  const isoDate = asUtcIsoString(date);
  return (
    <tr>
      <td>{accountName}</td>
      <td>{isoDate}</td>
      <td>{amount}</td>
      <td>
        <button onClick={() => onClaimEdit(id)}>
          edt
        </button>
      </td>
      <td>
        <button
          id={camelCase('button', 'del', accountName, isoDate)}
          onClick={() => onDel({ id })
        }>
          del
        </button>
      </td>
    </tr>
  );
}
