import { Form, usePayload } from '../../../app/components';

export function AccountEditView ({ account, releaseEdit, onEdit, errorsEdit }) {
  const { name } = account;
  const { payload, reset, bind } = usePayload({ name });

  const exit = () => {
    reset();
    releaseEdit();
  };

  const onSubmit = async () => {
    const editedAccount = {
      ...account,
      ...payload
    };
    const success = await onEdit(editedAccount);
    success && exit();
  };

  return (
    <tr>
      <td colSpan="2">
        <Form onSubmit={onSubmit}>
        <input {...bind('name')} />
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
