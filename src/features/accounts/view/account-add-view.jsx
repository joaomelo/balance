import { useState } from 'react';
import { Form, ModalDialog } from '../../../app/components';
import { usePayload } from '../../../app/hooks';

export function AccountAddView ({ onAdd, errors }) {
  const { payload, reset, bind } = usePayload({ name: '' });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async () => {
    const success = await onAdd(payload);
    success && reset();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add</button>
      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        aria-label="Add account form"
      >
        <Form onSubmit={onSubmit}>
          <input {...bind('name')} />
          <button type="submit">Add</button>
          <p>{errors.escaped}</p>
        </Form>
      </ModalDialog>
    </>
  );
}
