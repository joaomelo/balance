import { Loading, Form, usePayload } from '../../../app/components';
import { useCase } from '../../../app/use-case';
import { useGetter } from '../../../app/store';
import { createErrorReport } from '../../../app/error';
import { addCase } from '../cases';

export function Add ({ dependencies }) {
  const { accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'allItems', []);

  const { run, isRunning, error } = useCase(addCase, dependencies);
  const { payload, updatePayload } = usePayload({
    date: '',
    accountId: '',
    amount: 0
  });

  const errors = createErrorReport(error);

  return (
    <>
      <Loading isLoading={isRunning} />
      <Form onSubmit={() => run(payload)}>
        <input
          value={payload.date}
          onChange={e => updatePayload({ date: e.target.value })}
          type="date"
        />
        <select
          value={payload.accountId}
          onChange={e => updatePayload({ accountId: e.target.value })}
        >
          <option value="">--Please choose an account--</option>
          {accounts.map(({ id, name }) =>
            <option key={id} value={id}>{name}</option>)}
        </select>
        <input
          value={payload.amount}
          onChange={e => updatePayload({ amount: e.target.value })}
          type="number"
          step="0.01"
        />
        <button type="submit">Add</button>
        <p>{errors.escaped}</p>
      </Form>
    </>
  );
}
