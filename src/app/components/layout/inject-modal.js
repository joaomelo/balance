import { createPortal } from 'react-dom';

const modalContainer =
  document.getElementById('modals-container') ||
  document.body;

export function injectModal (component) {
  return createPortal(component, modalContainer);
};
