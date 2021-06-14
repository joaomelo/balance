import { Dialog, DialogContent } from '@material-ui/core';
import { usePayload, Form, ErrorMessage } from '../../../app/components';
import { createErrorReport } from '../../../app/error';

export function AccountDialogView ({
  initialPayload,
  error,
  onSubmit,
  isOpen,
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
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
}
