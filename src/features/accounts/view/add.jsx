import { Loading, Form, usePayload } from '../../../app/components';
import { useCase } from '../../../app/use-case';
import { createErrorReport } from '../../../app/error';
import { addCase } from '../cases';

export function Add ({ dependencies }) {
  const { run, isRunning, error } = useCase(addCase, dependencies);
  const { payload, updatePayload, resetPayload } = usePayload({ name: '' });

  const errors = createErrorReport(error);

  const onSubmit = async () => {
    const success = await run(payload);
    success && resetPayload();
  };

  return (
    <>
      <Loading isLoading={isRunning} />
      <Form onSubmit={onSubmit}>
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
