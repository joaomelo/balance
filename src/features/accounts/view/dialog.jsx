import { MenuItem, TextField } from "@material-ui/core";
import { useDialog } from "../../../libs/hooks/dialog";
import { useStream } from "../../../libs/hooks/stream";
import { ErrorAlert } from "../../../libs/components/error-alert";
import { ItemDialog } from "../../../libs/components/item-dialog";

export function AccountDialog({
  initialPayload,
  isOpen,
  onClose,
  dependencies,
}) {
  const { accountsCommands, groupsQuery } = dependencies;

  const groups = useStream(groupsQuery);
  const { submit, bind, error, isLoading } = useDialog({
    command: accountsCommands.set,
    initialPayload,
    errorSchema: {
      name: ["ACCOUNTS/NAME_INVALID", "ACCOUNTS/NON_UNIQUE_NAME"],
    },
    onSuccess: onClose,
  });

  return (
    <ItemDialog
      title="Account"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submit}
    >
      <NameField error={error("name")} {...bind("name")} />
      <GroupField groups={groups} {...bind("groupId")} />
      <ErrorAlert>{error("escaped")}</ErrorAlert>
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
