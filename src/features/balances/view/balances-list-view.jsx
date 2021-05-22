import { sortBy } from 'lodash';
import { useState } from 'react';
import { BalanceReadView } from './balance-read-view';
import { BalanceEditView } from './balance-edit-view';

export function BalancesListView ({ accounts, balances, onDel, onEdit, errorsEdit }) {
  const [idOnEdit, claimEdit] = useState(null);
  const releaseEdit = () => claimEdit(null);

  const sortedBalances = sortBy(balances, ['accountId', 'date']);

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
        {sortedBalances.map(b =>
          <BalanceView
            key={b.id}
            balance={b}
            accounts={accounts}
            onDel={onDel}
            onEdit={onEdit}
            errorsEdit={errorsEdit}
            idOnEdit={idOnEdit}
            claimEdit={claimEdit}
            releaseEdit={releaseEdit}
          />)
        }
      </tbody>
    </table>
  );
}

function BalanceView ({ idOnEdit, ...props }) {
  return idOnEdit === props.balance.id
    ? <BalanceEditView {...props} />
    : <BalanceReadView {...props} />;
}
