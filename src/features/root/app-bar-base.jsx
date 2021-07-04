import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import { appName } from '../../app/helpers';

export function AppBarBase ({ children }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        { children }
        <Typography
          component="h1"
          variant="h6"
        >
          {appName().toUpperCase()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
