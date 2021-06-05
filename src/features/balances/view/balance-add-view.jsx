import { useModal } from '../../../app/components';
import { BalanceFormView } from './balance-form-view';

export function BalanceAddView ({ accounts, onAdd, error }) {
  const initialPayload = {
    date: new Date(),
    accountId: accounts[0]?.id || '',
    amount: ''
  };
  const { open, close, modalProps, Modal } = useModal();

  return (
    <>
      <button
        id="buttonAddBalance"
        onClick={open}
      >
        Add
      </button>
      <Modal
        {...modalProps}
      >
        <BalanceFormView
          initialPayload={initialPayload}
          accounts={accounts}
          error={error}
          onSubmit={onAdd}
          onClose={close}
        />
      </Modal>
    </>
  );
}
