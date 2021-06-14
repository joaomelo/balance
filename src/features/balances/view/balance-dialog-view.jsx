import { Dialog, DialogContent } from '@material-ui/core';
import styled from 'styled-components';
import { usePayload, Form, ErrorMessage, InputDate, InputAmount, InputOptions } from '../../../app/components';
import { createErrorReport } from '../../../app/error';

export function BalanceDialogView ({
  initialPayload,
  accounts,
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
          <InputOptions
            id='inputAccount'
            options={accounts}
            valueKey='id'
            labelKey='name'
            {...bind('accountId')}
          />
          <InputDate
            id='inputDate'
            {...bind('date')}
          />
          <InputAmountConstrained
            id='inputAmount'
            {...bind('amount')}
          />
          <ErrorMessage code={errorReport.escaped}/>
          <button
            id='buttonCancel'
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

const InputAmountConstrained = styled(InputAmount)`
  max-width: var(--size-500)
`;
