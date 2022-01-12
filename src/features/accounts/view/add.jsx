import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/hooks/switch";
import { AccountDialog } from "./dialog";

export function AccountAdd({ groups, onAdd, error, isLoading }) {
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
        <AccountDialog
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
