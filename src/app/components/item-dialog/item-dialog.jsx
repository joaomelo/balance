import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@material-ui/core';
import { Form } from '../form';
import { ProgressDivider } from '../progress-divider';
import { SaveCancel } from '../save-cancel';

export function ItemDialog ({
  title,
  isLoading,
  isOpen,
  onClose,
  onSubmit,
  children,
  ...rest
}) {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isOpen}
      onClose={onClose}
      {...rest}
    >
      <Form onSubmit={onSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          {children}
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
