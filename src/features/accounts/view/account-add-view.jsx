import { Form, usePayload } from '../../../app/components';

export function AccountAddView ({ onAdd, errors }) {
  const { payload, reset, bind } = usePayload({ name: '' });

  const onSubmit = async () => {
    await onAdd(payload);
    reset();
  };

  return (
    <Form onSubmit={onSubmit}>
      <input {...bind('name')} />
      <button type="submit">Add</button>
      <p>{errors.escaped}</p>
    </Form>
  );
}
