import { Button } from '@material-ui/core';
import { useSwitch } from '../../../app/components';
import { BalanceDialogView } from './balance-dialog-view';

export function BalanceAddView ({ accounts, onAdd, error }) {
  const initialPayload = {
    date: new Date(),
    accountId: accounts[0]?.id || '',
    amount: ''
  };
  const [isOpen, open, close] = useSwitch();

  return (
    <>
      <Button
        id="buttonAddBalance"
        variant="contained"
        color="primary"
        onClick={open}
      >
        Add Balance
      </Button>
      <BalanceDialogView
        initialPayload={initialPayload}
        accounts={accounts}
        error={error}
        onSubmit={onAdd}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
