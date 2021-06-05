import { useState } from 'react';
import { useModal } from '../../../app/components';
import { AccountsListItemView } from './accounts-list-item-view';
import { AccountFormView } from './account-form-view';

export function AccountsListView ({
  accounts,
  onDel,
  onEdit,
  errorEdit
}) {
  const { open, close, modalProps, Modal } = useModal();
  const [initialPayload, setInitialPayload] = useState({});

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
      <Modal {...modalProps}>
        <AccountFormView
          initialPayload={initialPayload}
          error={errorEdit}
          onSubmit={onEdit}
          onClose={close}
        />
      </Modal>
    </>
  );
}
