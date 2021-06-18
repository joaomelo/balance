import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  TextField
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SaveTwoTone } from '@material-ui/icons';
import { usePayload, Form } from '../../../app/components';
import { createErrorReport } from '../../../app/error';

export function AccountDialogView ({
  initialPayload,
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
    name: ['ACCOUNTS/NAME_INVALID', 'ACCOUNTS/NON_UNIQUE_NAME']
  });

  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
        <DialogTitle>Account</DialogTitle>
        <Divider />
        <DialogContent>
          <NameField
            error={t(errorReport.name)}
            {...bind('name')}
          />
          { errorReport.escaped &&
            <Alert severity="error">{t(errorReport.escaped)}</Alert>
          }
        </DialogContent>
        { isLoading ? <LinearProgress /> : <Divider /> }
        <DialogActions>
          <Button
            id='buttonCancel'
            type='button'
            onClick={onClose}
            variant="text"
            color="primary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            id='buttonSave'
            type='submit'
            variant="contained"
            color="primary"
            startIcon={<SaveTwoTone />}
            disabled={isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

function NameField ({ error, ...rest }) {
  return (
    <TextField
      id='inputName'
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
