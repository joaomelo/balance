import {
  Box,
  Typography
} from '@material-ui/core';
import { AccountAddView } from './account-add-view';
import { AccountsListView } from './accounts-list-view';

export function AccountsPageView ({
  accounts,
  onAdd,
  errorAdd,
  onEdit,
  errorEdit,
  onDel,
  isLoading,
  t
}) {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          component="h1"
          variant="h6"
        >
          Accounts
        </Typography>
        <AccountAddView
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
          t={t}
        />
      </Box>
      <AccountsListView
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        error={errorEdit}
        isLoading={isLoading}
        t={t}
      />
    </div>
  );
}
