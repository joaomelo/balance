import { Form, ErrorMessage, useModal, usePayload } from '../../../app/components';

export function AccountAddView ({ onAdd, errors }) {
  const { payload, reset, bind } = usePayload({ name: '' });
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
        id='buttonAdd'
        onClick={open}
      >
        Add
      </button>
      <Modal
        {...modalProps}
        aria-label='Add account'
      >
        <Form onSubmit={onSubmit}>
          <input
            id='inputName'
            {...bind('name')}
          />
          <ErrorMessage code={errors.escaped}/>
          <button
            type='button'
            onClick={close}
          >
            Cancel
          </button>
          <button
            id='buttonSave'
            type='submit'
          >
            Save
          </button>
        </Form>
      </Modal>
    </>
  );
}
