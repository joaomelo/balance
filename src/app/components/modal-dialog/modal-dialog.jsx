import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

export function ModalDialog ({ isOpen, onClose, children, ...rest }) {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onClose}
      {...rest}
    >
      {children}
    </Dialog>
  );
}
