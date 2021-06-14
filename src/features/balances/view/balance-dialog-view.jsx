import { Alert } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  MenuItem,
  TextField
} from '@material-ui/core';
import {
  SaveTwoTone
} from '@material-ui/icons';
import {
  usePayload,
  Form
} from '../../../app/components';
import { createErrorReport } from '../../../app/error';

export function BalanceDialogView ({
  initialPayload,
  accounts,
  error,
  onSubmit,
  isOpen,
  onClose
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
    account: 'BALANCES/ACCOUNT_INVALID',
    date: ['BALANCES/DATE_REQUIRED', 'BALANCES/DATE_COLLIDING'],
    amount: 'BALANCES/AMOUNT_REQUIRED'
  });

  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <DialogTitle>Balance</DialogTitle>
        <DialogContent>
          <AccountField
            accounts={accounts}
            error={errorReport.account}
            {...bind('accountId')}
          />
          <DateField
            error={errorReport.date}
            {...bind('date')}
          />
          <AmountField
            error={errorReport.amount}
            {...bind('amount')}
          />
          { errorReport.escaped &&
            <Alert severity="error">{(errorReport.escaped)}</Alert>
          }
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            id='buttonCancel'
            type='button'
            onClick={onClose}
            variant="text"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            id='buttonSave'
            type='submit'
            variant="contained"
            color="primary"
            startIcon={<SaveTwoTone />}
          >
            Save
          </Button>
      </DialogActions>
      </Form>
    </Dialog>
  );
}

function AccountField ({ accounts, error, ...rest }) {
  return (
    <TextField
      id="inputAccount"
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
      {accounts.map(a => (
        <MenuItem
          key={a.id}
          value={a.id}
        >
          {a.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

function DateField ({ error, ...rest }) {
  return (
    <KeyboardDatePicker
      id="inputDate"
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

function AmountField ({ error, ...rest }) {
  const AmountAdornment = () => (
    <InputAdornment position="start">
      $
    </InputAdornment>
  );

  // export function InputAmount ({ value, onChange, ...rest }) {
  //   const handleChange = e => {
  //     const amount = parseFloat(e.target.value) || '';
  //     onChange(amount);
  //   };

  //   return (
  //     <input
  //       value={value}
  //       onChange={handleChange}
  //       type="number"
  //       step="0.01"
  //       {...rest}
  //     />
  //   );
  // }

  return (
    <TextField
      id="inputAmount"
      type="number"
      label="Amount"
      variant="outlined"
      fullWidth
      margin="normal"
      required
      error={!!error}
      helperText={error}
      InputProps={{ startAdornment: <AmountAdornment /> }}
      inputProps={{ step: '0.01' }}
      {...rest}
    />
  );
}
