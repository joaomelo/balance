import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField
} from '@material-ui/core';
import {
  usePayload,
  ErrorAlert,
  Form,
  ProgressDivider,
  SaveCancel
} from '../../../app/components';
import { Select } from 'antd';
import { createErrorReport } from '../../../app/error';

export function GroupDialogView ({
  initialPayload,
  accounts,
  error,
  onSubmit,
  isOpen,
  onClose,
  isLoading,
  t
}) {
  const { payload, bind, reset } = usePayload(initialPayload);
  const handleSubmit = async () => {
    const success = await onSubmit(payload);
    if (success) {
      reset();
      onClose();
    }
  };

  const errorReport = createErrorReport(error, {
    name: ['GROUPS/NAME_INVALID', 'GROUPS/NON_UNIQUE_NAME']
  });

  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <DialogTitle>Group</DialogTitle>
        <Divider />
        <DialogContent>
          <NameField
            error={t(errorReport.name)}
            {...bind('name')}
          />
          <AccountsField
            accounts={accounts}
            {...bind('accounts')}
          />
          <ErrorAlert>{t(errorReport.escaped)}</ErrorAlert>
        </DialogContent>
        <ProgressDivider isLoading={isLoading}/>
        <DialogActions>
          <SaveCancel
            isLoading={isLoading}
            onCancel={onClose}
          />
        </DialogActions>
      </Form>
    </Dialog>
  );
}

function NameField ({ error, ...rest }) {
  return (
    <TextField
      id='inputName'
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

const { Option } = Select;
function AccountsField ({ accounts, ...rest }) {
  console.log({ accounts, rest });
  return (
    <Select
      id="selectAccounts"
      mode="multiple"
      allowClear
      {...rest}
    >
      {accounts.map(({ id, name }) => (
        <Option
          key={id}
          value={id}
        >
          {name}
        </Option>
      ))}
    </Select>
  );
}

// function AccountsField ({ accounts, ...rest }) {
//   console.log({ accounts, rest });
//   return (
//     <FormControl
//       fullWidth
//       margin="normal"
//       variant="outlined"
//     >
//       <InputLabel id="selectAccountsLabel">
//         Accounts
//       </InputLabel>
//       <Select
//         id="selectAccounts"
//         labelId="selectAccountsLabel"
//         multiple
//         variant="outlined"
//         input={<Input
//           id="inputAccounts"
//           variant="outlined"
//         />}
//         renderValue={selectedAccounts => (
//           <Box
//             display="flex"
//             flexWrap="wrap"
//           >
//             {selectedAccounts.map(({ id, name }) => (
//               <AccountChip
//                 key={id}
//                 label={name}
//               />
//             ))}
//           </Box>
//         )}
//         {...rest}
//       >
//         {accounts.map(({ id, name }) => (
//           <MenuItem
//             key={id}
//             value={name}
//           >
//             {name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

// function AccountChip ({ label }) {
//   return (
//     <Chip
//       label={label}
//     />
//   );
// }
