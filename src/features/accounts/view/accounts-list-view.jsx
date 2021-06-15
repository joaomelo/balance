import { useState } from 'react';
import { useSwitch } from '../../../app/components';
import { AccountsListItemView } from './accounts-list-item-view';
import { AccountDialogView } from './account-dialog-view';

export function AccountsListView ({
  accounts,
  onDel,
  onEdit,
  errorEdit
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleClaimEdit = id => {
    const account = accounts.find(a => a.id === id);
    setInitialPayload(account);
    open();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(a =>
            <AccountsListItemView
              key={a.id}
              account={a}
              onDel={onDel}
              onClaimEdit={handleClaimEdit}
            />
          )}
        </tbody>
      </table>
      {isOpen &&
        <AccountDialogView
          initialPayload={initialPayload}
          error={errorEdit}
          onSubmit={onEdit}
          isOpen={isOpen}
          onClose={close}
        />
      }
    </>
  );
}
