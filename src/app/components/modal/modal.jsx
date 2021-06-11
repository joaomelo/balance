export function Modal ({ isOpen, onClose, children, ...rest }) {
  return (
    <div
      isOpen={isOpen}
      onDismiss={onClose}
      aria-label='modal dialog'
      {...rest}
    >
      {children}
    </div>
  );
}
