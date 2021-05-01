import { Form, usePayload } from '../../../app/components';

export function BalancesAddView ({ accounts, onAdd, errors }) {
  const initialPayload = {
    date: '',
    accountId: '',
    amount: 0
  };
  const { payload, bind, reset } = usePayload(initialPayload);

  const onSubmit = async () => {
    await onAdd(payload);
    reset();
  };

  return (
    <Form onSubmit={onSubmit}>
      <input {...bind('date')} type="date"/>
      <select {...bind('accountId')}>
        <option value=""> --Please choose an account-- </option>
        {accounts.map(AccountOption)}
      </select>
      <input
        {...bind('amount')}
        type="number"
        step="0.01"
      />
      <button type="submit">Add</button>
      <p>{errors.escaped}</p>
    </Form>
  );
}

function AccountOption ({ id, name }) {
  return <option key={id} value={id}>{name}</option>;
}
