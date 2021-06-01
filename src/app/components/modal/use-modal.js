import { useState } from 'react';
import { Modal } from './modal';

export function useModal (initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const modalProps = {
    isOpen,
    onClose: close
  };

  return {
    open,
    close,
    modalProps,
    Modal
  };
}
