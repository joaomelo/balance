import styled from 'styled-components';
import { Form, ErrorMessage, InputDate, InputAmount, InputOptions } from '../../../app/components';

export function BalanceFormView (props) {
  const { accounts, onSubmit, bind, errors } = props;

  return (
    <Form onSubmit={onSubmit}>
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
      <ErrorMessage code={errors.escaped}/>
      <button
        id='buttonCancel'
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
  );
}

const InputAmountConstrained = styled(InputAmount)`
  max-width: var(--size-500)
`;
