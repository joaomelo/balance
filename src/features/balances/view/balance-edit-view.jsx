import { usePayload } from '../../../app/components';
import { BalanceFormView } from './balance-form-view';

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
      <td colSpan="3">
        <BalanceFormView
          onSubmit={onSubmit}
          accounts={accounts}
          bind={bind}
          errors={errorsEdit}
        >
          <button type="submit">sav</button>
          <button onClick={exit}>can</button>
        </BalanceFormView>
      </td>
    </tr>
  );
}
