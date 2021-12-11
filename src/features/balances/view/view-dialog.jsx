import { MenuItem, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import NumberFormat from "react-number-format";
import { usePayload } from "../../../components/payload";
import { ErrorAlert } from "../../../components/error-alert";
import { ItemDialog } from "../../../components/item-dialog";
import { useI18n } from "../../../app/i18n";
import { createErrorReport } from "../../../libs/errors";

export function BalanceDialogView({
  initialPayload,
  accounts,
  error,
  onSubmit,
  isOpen,
  onClose,
  isLoading,
}) {
  const t = useI18n();
  const { payload, bind, reset } = usePayload(initialPayload);
  const handleSubmit = async () => {
    const success = await onSubmit(payload);
    if (success) {
      reset();
      onClose();
    }
  };

  const errorReport = createErrorReport(error, {
    account: "BALANCES/ACCOUNT_INVALID",
    date: ["BALANCES/DATE_INVALID", "BALANCES/DATE_COLLIDING"],
    amount: "BALANCES/AMOUNT_INVALID",
  });

  return (
    <ItemDialog
      title="Balance"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <AccountField
        accounts={accounts}
        error={t(errorReport.account)}
        {...bind("accountId")}
      />
      <DateField error={t(errorReport.date)} {...bind("date")} />
      <AmountField error={t(errorReport.amount)} {...bind("amount")} />
      <ErrorAlert>{t(errorReport.escaped)}</ErrorAlert>
    </ItemDialog>
  );
}

function AccountField({ accounts, error, ...rest }) {
  return (
    <TextField
      id="inputAccount"
      autoFocus
      label="Account"
      variant="outlined"
      select
      fullWidth
      margin="normal"
      required
      error={!!error}
      helperText={error}
      {...rest}
    >
      {accounts.map((a) => (
        <MenuItem key={a.id} value={a.id}>
          {a.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

function DateField({ error, value, onChange, ...rest }) {
  const handleChange = (luxonDate) => {
    const date = luxonDate?.isValid ? luxonDate.endOf("day").toJSDate() : null;
    onChange(date);
  };

  return (
    <KeyboardDatePicker
      id="inputDate"
      value={value}
      onChange={handleChange}
      label="Date"
      inputVariant="outlined"
      fullWidth
      margin="normal"
      required
      error={!!error}
      helperText={error}
      clearable
      format="yyyy-MM-dd"
      {...rest}
    />
  );
}

function AmountField({ error, value, onChange, ...rest }) {
  return (
    <TextField
      id="inputAmount"
      value={value || ""}
      onChange={onChange}
      label="Amount"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      error={!!error}
      helperText={error}
      InputProps={{ inputComponent: NumberFormatCustom }}
      {...rest}
    />
  );
}

function NumberFormatCustom({ inputRef, onChange, ...other }) {
  return (
    <NumberFormat
      getInputRef={inputRef}
      onValueChange={({ floatValue }) => onChange(floatValue)}
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator
      isNumericString
      prefix="$"
      {...other}
    />
  );
}
