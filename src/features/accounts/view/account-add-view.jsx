import { Button } from '@material-ui/core';
import { useSwitch } from '../../../app/components';
import { AccountDialogView } from './account-dialog-view';

export function AccountAddView ({ onAdd, error }) {
  const initialPayload = { name: '' };
  const [isOpen, open, close] = useSwitch();

  return (
    <>
      <Button
        id="buttonAddAccount"
        variant="contained"
        color="primary"
        onClick={open}
      >
        Add Account
      </Button>
      <AccountDialogView
        initialPayload={initialPayload}
        error={error}
        onSubmit={onAdd}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
