import { Alert } from '@material-ui/lab';

export function ErrorAlert ({ children }) {
  if (!children) return null;

  return <Alert severity="error">{children}</Alert>;
}
