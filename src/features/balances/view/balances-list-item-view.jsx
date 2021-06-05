import { asUtcIsoString, camelCase } from '../../../app/helpers';

export function BalancesListItemView ({
  balance,
  onDel,
  onClaimEdit
}) {
  const { id, accountName, date, amount } = balance;
  const isoDate = asUtcIsoString(date);
  return (
    <tr id={camelCase('row', 'balance', accountName, isoDate)}>
      <td id={camelCase('cell', 'name', accountName, isoDate)}>
        {accountName}
      </td>
      <td id={camelCase('cell', 'date', accountName, isoDate)}>
        {isoDate}
      </td>
      <td id={camelCase('cell', 'amount', accountName, isoDate)}>
        {amount}
      </td>
      <td>
        <button
          id={camelCase('button', 'edit', accountName, isoDate)}
          onClick={() => onClaimEdit(id)}
        >
          edt
        </button>
      </td>
      <td>
        <button
          id={camelCase('button', 'del', accountName, isoDate)}
          onClick={() => onDel({ id })}
        >
          del
        </button>
      </td>
    </tr>
  );
}
