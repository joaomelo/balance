import { DateTime } from "luxon";
import { Button } from "@material-ui/core";
import { useSwitch } from "../../../libs/hooks/switch";
import { BalanceDialog } from "./dialog";

export function BalanceAdd({ accounts, onAdd, error, isLoading }) {
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
        <BalanceDialog
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
