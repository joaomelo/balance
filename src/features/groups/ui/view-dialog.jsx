import { TextField } from '@material-ui/core';
import { usePayload } from '../../../app/components/payload';
import { ErrorAlert } from '../../../app/components/error-alert';
import { ItemDialog } from '../../../app/components/item-dialog';
import { useI18n } from '../../../app/i18n';
import { createErrorReport } from '../../../app/error';

export function GroupDialogView ({
  initialPayload,
  error,
  onSubmit,
  isOpen,
  onClose,
  isLoading
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
    name: ['GROUPS/NAME_INVALID', 'GROUPS/NON_UNIQUE_NAME']
  });

  return (
    <ItemDialog
      title='Group'
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <NameField
        error={t(errorReport.name)}
        {...bind('name')}
      />
      <ErrorAlert>{t(errorReport.escaped)}</ErrorAlert>
    </ItemDialog>
  );
}

function NameField ({ error, ...rest }) {
  return (
    <TextField
      id='inputName'
      autoFocus
      label='Name'
      variant='outlined'
      fullWidth
      margin='normal'
      required
      error={!!error}
      helperText={error}
      {...rest}
    />
  );
}
