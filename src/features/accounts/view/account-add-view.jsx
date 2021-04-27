import { Form } from '../../../app/components';
import { usePayload } from '../../../app/hooks';

export function AccountAddView ({
  onAdd,
  errors
}) {
  const { payload, updatePayload, resetPayload } = usePayload({ name: '' });

  return (
    <Form
      onSubmit={() => onAdd(payload)}
      onSuccess={resetPayload}
    >
      <input
        value={payload.name}
        onChange={e => updatePayload({ name: e.target.value })}
      />
      <button type="submit">Add</button>
      <p>{errors.escaped}</p>
    </Form>
  );
}
