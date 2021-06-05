import { useState } from 'react';
import { useModal } from '../../../app/components';
import { BalancesListItemView } from './balances-list-item-view';
import { BalanceFormView } from './balance-form-view';

export function BalancesListView ({
  accounts,
  balances,
  onDel,
  onEdit,
  errorEdit
}) {
  const { open, close, modalProps, Modal } = useModal();
  const [initialPayload, setInitialPayload] = useState({});

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
      <Modal {...modalProps}>
        <BalanceFormView
          initialPayload={initialPayload}
          accounts={accounts}
          error={errorEdit}
          onSubmit={onEdit}
          onClose={close}
        />
      </Modal>
    </>
  );
}
