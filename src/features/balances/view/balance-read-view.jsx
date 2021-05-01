import { asUtcIsoString } from '../../../app/helpers';

export function BalanceReadView ({ balance, accounts, onDel, claimEdit }) {
  const { id, accountId, date, amount } = balance;
  const { name } = accounts.find(a => a.id === accountId);
  return (
    <tr>
      <td>{name}</td>
      <td>{asUtcIsoString(date)}</td>
      <td>{amount}</td>
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
