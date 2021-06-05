import styled from 'styled-components';
import { usePayload, Form, ErrorMessage, InputDate, InputAmount, InputOptions } from '../../../app/components';
import { createErrorReport } from '../../../app/error';

export function BalanceFormView ({
  initialPayload,
  accounts,
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
  );
}

const InputAmountConstrained = styled(InputAmount)`
  max-width: var(--size-500)
`;
