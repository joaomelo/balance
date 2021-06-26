import { Button } from '@material-ui/core';
import { useSwitch } from '../../../app/components';
import { GroupDialogView } from './group-dialog-view';

export function GroupAddView ({
  onAdd,
  error,
  isLoading,
  t
}) {
  const initialPayload = { name: '' };
  const [isOpen, open, close] = useSwitch();

  return (
    <>
      <Button
        id="buttonAddGroup"
        variant="contained"
        color="primary"
        onClick={open}
      >
        Add Group
      </Button>
      {isOpen &&
        <GroupDialogView
          initialPayload={initialPayload}
          error={error}
          onSubmit={onAdd}
          isOpen={isOpen}
          onClose={close}
          isLoading={isLoading}
          t={t}
        />
      }
    </>
  );
}
