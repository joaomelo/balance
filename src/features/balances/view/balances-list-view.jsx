import { useState } from 'react';
import { useSwitch } from '../../../app/components';
import { BalancesListItemView } from './balances-list-item-view';
import { BalanceDialogView } from './balance-dialog-view';

export function BalancesListView ({
  accounts,
  balances,
  onDel,
  onEdit,
  errorEdit
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleClaimEdit = id => {
    const balance = balances.find(b => b.id === id);
    setInitialPayload(balance);
    open();
  };

  return (
    <>
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
              onClaimEdit={handleClaimEdit}
            />)
          }
        </tbody>
      </table>
      <BalanceDialogView
        initialPayload={initialPayload}
        accounts={accounts}
        error={errorEdit}
        onSubmit={onEdit}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
