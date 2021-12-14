import { DateTime } from "luxon";
import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/components/switch";
import { BalanceDialogView } from "./view-dialog";

export function BalanceAddView({ accounts, onAdd, error, isLoading }) {
  const initialPayload = {
    date: DateTime.now().endOf("day").toJSDate(),
    accountId: accounts[0]?.id || "",
    amount: null,
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
      {isOpen && (
        <BalanceDialogView
          initialPayload={initialPayload}
          accounts={accounts}
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
