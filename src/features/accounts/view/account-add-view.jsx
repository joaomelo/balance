import { Form, usePayload } from '../../../app/components';

export function AccountAddView ({ onAdd, errors }) {
  const { payload, reset, bind } = usePayload({ name: '' });

  const onSubmit = async () => {
    const success = await onAdd(payload);
    success && reset();
  };

  return (
    <Form onSubmit={onSubmit}>
      <input {...bind('name')} />
      <button type="submit">Add</button>
      <p>{errors.escaped}</p>
    </Form>
  );
}
