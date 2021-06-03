import { usePayload, useModal } from '../../../app/components';
import { BalanceFormView } from './balance-form-view';

export function BalanceAddView ({ accounts, onAdd, errors }) {
  const initialPayload = {
    date: new Date(),
    accountId: accounts[0]?.id || '',
    amount: 0
  };
  const { payload, bind, reset } = usePayload(initialPayload);
  const { open, close, modalProps, Modal } = useModal();

  const onSubmit = async () => {
    const success = await onAdd(payload);
    if (success) {
      reset();
      close();
    }
  };

  return (
    <>
      <button
        id="buttonAdd"
        onClick={open}
      >
        Add
      </button>
      <Modal
        {...modalProps}
        aria-label="Add balance"
      >
        <BalanceFormView
          onSubmit={onSubmit}
          onCancel={close}
          accounts={accounts}
          bind={bind}
          errors={errors}
        />
      </Modal>
    </>
  );
}
