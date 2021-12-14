import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/components/switch";
import { GroupDialogView } from "./view-dialog";

export function GroupAddView({ accounts, onAdd, error, isLoading }) {
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
        <GroupDialogView
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
