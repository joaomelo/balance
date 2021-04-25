import { Loading, Form, usePayload } from '../../../app/components';
import { useCase } from '../../../app/use-case';
import { createErrorReport } from '../../../app/error';
import { addAccountCase } from '../cases';

export function AddAccountView ({ dependencies }) {
  const { run, isRunning, error } = useCase(addAccountCase, dependencies);
  const { payload, updatePayload, resetPayload } = usePayload({ name: '' });

  const errors = createErrorReport(error);

  return (
    <>
      <Loading isLoading={isRunning} />
      <Form
        onSubmit={() => run(payload)}
        onSuccess={resetPayload}
      >
        <input
          value={payload.name}
          onChange={e => updatePayload({ name: e.target.value })}
        />
        <button type="submit">Add</button>
        <p>{errors.escaped}</p>
      </Form>
    </>
  );
}
