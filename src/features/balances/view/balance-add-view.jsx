import { usePayload } from '../../../app/components';
import { BalanceFormView } from './balance-form-view';

export function BalancesAddView ({ accounts, onAdd, errors }) {
  const initialPayload = {
    date: new Date(),
    accountId: accounts[0]?.id || '',
    amount: 0
  };
  const { payload, bind, reset } = usePayload(initialPayload);

  const onSubmit = async () => {
    const success = await onAdd(payload);
    success && reset();
  };

  return (
    <BalanceFormView
      onSubmit={onSubmit}
      accounts={accounts}
      bind={bind}
      errors={errors}
    >
      <button type="submit">Add</button>
    </BalanceFormView>
  );
}
