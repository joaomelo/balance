import {
  Divider,
  LinearProgress
} from '@material-ui/core';

export function ProgressDivider ({ isLoading }) {
  return isLoading ? <LinearProgress /> : <Divider />;
}
