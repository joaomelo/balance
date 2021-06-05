import { asUtcIsoString, camelCase } from '../../../app/helpers';

export function AccountsListItemView ({
  account,
  onDel,
  onClaimEdit
}) {
  const { id, name, balances } = account;
  const { date, amount } = balances.length > 0
    ? balances[0]
    : { date: null, amount: null };

  return (
    <tr id={camelCase('row', 'account', name)}>
      <td id={camelCase('cell', 'name', name)}>
        {name}
      </td>
      <td id={camelCase('cell', 'date', name)}>
        {date ? asUtcIsoString(date) : '-'}
      </td>
      <td id={camelCase('cell', 'amount', name)}>
        {amount || '-'}
      </td>
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
