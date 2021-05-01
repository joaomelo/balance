import { Form, usePayload } from '../../../app/components';

export function BalanceEditView ({ balance, accounts, releaseEdit, onEdit, errorsEdit }) {
  const { accountId, date, amount } = balance;
  const { payload, reset, bind } = usePayload({ date, amount, accountId });

  const exit = () => {
    reset();
    releaseEdit();
  };

  const onSubmit = async () => {
    const editedBalance = {
      ...balance,
      ...payload
    };
    const success = await onEdit(editedBalance);
    success && exit();
  };

  return (
    <tr>
      <td colSpan="2">
        <Form onSubmit={onSubmit}>
          <input {...bind('date')} type="date"/>
          <select {...bind('accountId')}>
            {accounts.map(AccountOption)}
          </select>
          <input
            {...bind('amount')}
            type="number"
            step="0.01"
          />
          <button type="submit">sav</button>
          <p>{errorsEdit.escaped}</p>
        </Form>
      </td>
      <td>
        <button onClick={exit}>
          can
        </button>
      </td>
    </tr>
  );
}

function AccountOption ({ id, name }) {
  return <option key={id} value={id}>{name}</option>;
}
