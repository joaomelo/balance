import { BalancesListItemView } from './balances-list-item-view';

export function BalancesListView ({
  balances,
  onDel,
  onEdit,
  errorEdit
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th>Date</th>
          <th>Amount</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {balances.map(b =>
          <BalancesListItemView
            key={b.id}
            balance={b}
            onDel={onDel}
            onClaimEdit={id => console.log({ edit: id })}
          />)
        }
      </tbody>
    </table>
  );
}
