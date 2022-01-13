import { Link } from "react-router-dom";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@material-ui/core";
import {
  AccountBalanceTwoTone,
  AccountBalanceWalletTwoTone,
  AssessmentTwoTone,
  GroupWorkTwoTone,
  MeetingRoomTwoTone,
} from "@material-ui/icons";
import { camelCase } from "../../libs/helpers";
import { useCommand } from "../../libs/hooks/command";

export function AppSidebar({ isOpen, onClose, dependencies }) {
  const { authCommands } = dependencies;
  const [signOut] = useCommand(authCommands.signOut);

  return (
    <Drawer open={isOpen} onClose={onClose} onClick={onClose}>
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
          <ListLink icon={<GroupWorkTwoTone />} text="Groups" to="/i/groups" />
          <ListLink
            icon={<AssessmentTwoTone />}
            text="History"
            to="/i/history"
          />
          <Divider />
          <ListAction
            icon={<MeetingRoomTwoTone />}
            text="Sign Out"
            onClick={signOut}
          />
        </List>
      </Box>
    </Drawer>
  );
}

function ListLink({ icon, text, to }) {
  return (
    <li>
      <ListItem id={camelCase("nav", text)} button component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
}

function ListAction({ icon, text, onClick }) {
  return (
    <li>
      <ListItem id={camelCase("nav", text)} button onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
}
