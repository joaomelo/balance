import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { appName, appVersion } from '../../app/helpers';

export function AppTopbar ({ showHamburger, onHamburgerClick }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Hamburger
          show={showHamburger}
          onClick={onHamburgerClick}
        />
        <AppName />
        <AppVersion />
      </Toolbar>
    </AppBar>
  );
}

function Hamburger ({ show, onClick }) {
  if (!show) return null;

  return (
    <Box mr={1}>
      <IconButton
        id="buttonNav"
        edge="start"
        color="inherit"
        onClick={onClick}
      >
        <Menu />
      </IconButton>
    </Box>
  );
}

function AppName () {
  return (
    <Typography
      component="h1"
      variant="h6"
    >
      {appName().toUpperCase()}
    </Typography>
  );
}

function AppVersion () {
  return (
    <Box
      position="absolute"
      bottom={0}
      right={0}
      marginRight={1}
    >
      <Typography
        variant="caption"
      >
        v{appVersion()}
      </Typography>
    </Box>
  );
}
