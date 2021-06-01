import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

export function Modal ({ isOpen, onClose, children, ...rest }) {
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
