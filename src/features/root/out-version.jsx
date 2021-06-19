import { Typography } from '@material-ui/core';
import { appVersion } from '../../app/helpers';

export function OutVersion () {
  return (
    <Typography
      variant="caption"
      color="textSecondary"
    >
      v{appVersion()}
    </Typography>
  );
}
