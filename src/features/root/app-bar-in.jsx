import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer
} from '@material-ui/core';
import {
  AccountBalanceTwoTone,
  AccountBalanceWalletTwoTone,
  AssessmentTwoTone,
  GroupWorkTwoTone,
  MeetingRoomTwoTone,
  Menu
} from '@material-ui/icons';
import { camelCase } from '../../app/helpers';
import { useSwitch } from '../../app/components/switch';
import { useCommand } from '../../app/components/command';
import { signOutCommand } from '../auth';
import { AppVersion } from './app-version';
import { AppBarBase } from './app-bar-base';

export function AppBarIn ({ dependencies }) {
  const [isOpen, open, close] = useSwitch();
  const [onSignOut] = useCommand(dependencies, signOutCommand);

  return (
    <>
      <AppBarBase>
        <Box mr={1}>
          <IconButton
            id="buttonNav"
            edge="start"
            color="inherit"
            onClick={open}
          >
            <Menu />
          </IconButton>
        </Box>
      </AppBarBase>
      <AppDrawer
        isOpen={isOpen}
        onClose={close}
        onSignOut={onSignOut}
      />
    </>
  );
}

function AppDrawer ({ isOpen, onClose, onSignOut }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      onClick={onClose}
    >
      <Box width={250}>
        <List>
          <ListLink
            icon={<AccountBalanceWalletTwoTone />}
            text="Balances"
            to="/i/balances"
          />
          <ListLink
            icon={<AccountBalanceTwoTone />}
            text="Accounts"
            to="/i/accounts"
          />
          <ListLink
            icon={<GroupWorkTwoTone />}
            text="Groups"
            to="/i/groups"
          />
          <ListLink
            icon={<AssessmentTwoTone />}
            text="History"
            to="/i/history"
          />
          <Divider />
          <ListAction
            icon={<MeetingRoomTwoTone />}
            text="Sign Out"
            onClick={onSignOut}
          />
        </List>
        <AppVersionPositioned />
      </Box>
    </Drawer>
  );
}

function ListLink ({ icon, text, to }) {
  return (
    <li>
      <ListItem
        id={camelCase('nav', text)}
        button
        component={Link}
        to={to}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
}

function ListAction ({ icon, text, onClick }) {
  return (
    <li>
      <ListItem button onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
}

function AppVersionPositioned () {
  return (
    <Box
      position="absolute"
      bottom={0}
      right={0}
      marginRight={1}
    >
      <AppVersion />
    </Box>
  );
}