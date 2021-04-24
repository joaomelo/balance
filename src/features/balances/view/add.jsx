import { Loading, Form, usePayload } from '../../../app/components';
import { useCase } from '../../../app/use-case';
import { createErrorReport } from '../../../app/error';
import { addCase } from '../cases';

export function Add ({ dependencies }) {
  const { run, isRunning, error } = useCase(addCase, dependencies);
  const { payload, updatePayload } = usePayload({
    date: new Date(),
    account: '',
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
        <input
          value={payload.account}
          onChange={e => updatePayload({ account: e.target.value })}
        />
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
