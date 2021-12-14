import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/components/switch";
import { AccountDialogView } from "./view-dialog";

export function AccountAddView({ groups, onAdd, error, isLoading }) {
  const initialPayload = { name: "", groupId: null };
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
      {isOpen && (
        <AccountDialogView
          initialPayload={initialPayload}
          groups={groups}
          error={error}
          onSubmit={onAdd}
          isOpen={isOpen}
          onClose={close}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
