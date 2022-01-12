import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/hooks/switch";
import { GroupDialog } from "./dialog";

export function GroupAdd({ accounts, onAdd, error, isLoading }) {
  const initialPayload = { name: "" };
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
      {isOpen && (
        <GroupDialog
          initialPayload={initialPayload}
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
