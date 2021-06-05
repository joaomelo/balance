import { useModal } from '../../../app/components';
import { AccountFormView } from './account-form-view';

export function AccountAddView ({ onAdd, error }) {
  const initialPayload = { name: '' };
  const { open, close, modalProps, Modal } = useModal();

  return (
    <>
      <button
        id='buttonAddAccount'
        onClick={open}
      >
        Add
      </button>
      <Modal
        {...modalProps}
      >
        <AccountFormView
          initialPayload={initialPayload}
          error={error}
          onSubmit={onAdd}
          onClose={close}
        />
      </Modal>
    </>
  );
}
