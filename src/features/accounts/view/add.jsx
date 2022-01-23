import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/hooks/switch";
import { AccountDialog } from "./dialog";

export function AccountAdd({ dependencies }) {
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
          isOpen={isOpen}
          onClose={close}
          dependencies={dependencies}
        />
      )}
    </>
  );
}
