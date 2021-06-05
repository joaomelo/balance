import { usePayload, Form, ErrorMessage } from '../../../app/components';
import { createErrorReport } from '../../../app/error';

export function AccountFormView ({
  initialPayload,
  error,
  onSubmit,
  onClose
}) {
  const { payload, bind, reset } = usePayload(initialPayload);
  const handleSubmit = async () => {
    const success = await onSubmit(payload);
    if (success) {
      reset();
      onClose();
    }
  };

  const errorReport = createErrorReport(error);

  return (
    <Form onSubmit={handleSubmit}>
      <input
        id='inputName'
        {...bind('name')}
      />
      <ErrorMessage code={errorReport.escaped}/>
      <button
        type='button'
        onClick={onClose}
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
  );
}
