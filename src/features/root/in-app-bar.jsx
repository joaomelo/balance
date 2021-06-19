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
  MeetingRoomTwoTone,
  Menu
} from '@material-ui/icons';
import { useSwitch, useCommand } from '../../app/components';
import { signOutCommand } from '../auth';
import { OutAppBar } from './out-app-bar';

export function InAppBar ({ dependencies }) {
  const [isOpen, open, close] = useSwitch();
  const [onSignOut] = useCommand(dependencies, signOutCommand);

  return (
    <>
      <OutAppBar>
        <Box mr={1}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={open}
          >
            <Menu />
          </IconButton>
        </Box>
      </OutAppBar>
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
            icon={<AccountBalanceTwoTone />}
            text="Accounts"
            to="/i/accounts"
          />
          <ListLink
            icon={<AccountBalanceWalletTwoTone />}
            text="Balances"
            to="/i/balances"
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
      </Box>
    </Drawer>
  );
}

function ListLink ({ icon, text, to }) {
  return (
    <li>
      <ListItem button component={Link} to={to}>
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
