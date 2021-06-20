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
