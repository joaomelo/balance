import styled from 'styled-components';
import { FormInline, InputDate, InputAmount, InputOptions } from '../../../app/components';

export function BalanceFormView (props) {
  const { children, accounts, onSubmit, bind, errors } = props;

  return (
    <>
      <FormInline onSubmit={onSubmit}>
        <InputOptions
          options={accounts}
          valueKey='id'
          labelKey='name'
          {...bind('accountId')}
        />
        <InputDate {...bind('date')}/>
        <InputAmountConstrained {...bind('amount')}/>
        { children }
      </FormInline>
      <p>{errors.escaped}</p>
    </>
  );
}

export const InputAmountConstrained = styled(InputAmount)`
  max-width: var(--size-500)
`;
