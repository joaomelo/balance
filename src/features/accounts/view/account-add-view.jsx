import { useState } from 'react';
import { Form, ModalDialog, ErrorMessage } from '../../../app/components';
import { usePayload } from '../../../app/hooks';

export function AccountAddView ({ onAdd, errors }) {
  const { payload, reset, bind } = usePayload({ name: '' });

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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
      <ModalDialog
        isOpen={isOpen}
        onClose={close}
        aria-label="Add account"
      >
        <Form onSubmit={onSubmit}>
          <input
            id="inputName"
            {...bind('name')}
          />
          <ErrorMessage code={errors.escaped}/>
          <button
            type="button"
            onClick={close}
          >
            Cancel
          </button>
          <button
            id="buttonSave"
            type="submit"
          >
            Save
          </button>
        </Form>
      </ModalDialog>
    </>
  );
}
