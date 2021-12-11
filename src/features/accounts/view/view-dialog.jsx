import { MenuItem, TextField } from "@material-ui/core";
import { usePayload } from "../../../components/payload";
import { ErrorAlert } from "../../../components/error-alert";
import { ItemDialog } from "../../../components/item-dialog";
import { useI18n } from "../../../app/i18n";
import { createErrorReport } from "../../../libs/errors";

export function AccountDialogView({
  initialPayload,
  groups,
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
    name: ["ACCOUNTS/NAME_INVALID", "ACCOUNTS/NON_UNIQUE_NAME"],
  });

  return (
    <ItemDialog
      title="Account"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <NameField error={t(errorReport.name)} {...bind("name")} />
      <GroupField groups={groups} {...bind("groupId")} />
      <ErrorAlert>{t(errorReport.escaped)}</ErrorAlert>
    </ItemDialog>
  );
}

function NameField({ error, ...rest }) {
  return (
    <TextField
      id="inputName"
      autoFocus
      label="Name"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      error={!!error}
      helperText={error}
      {...rest}
    />
  );
}

function GroupField({ groups, value, ...rest }) {
  return (
    <TextField
      id="selectGroup"
      value={value || ""}
      label="Group"
      variant="outlined"
      select
      fullWidth
      margin="normal"
      disabled={groups.length === 0}
      {...rest}
    >
      {groups.map((g) => (
        <MenuItem key={g.id} value={g.id}>
          {g.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
