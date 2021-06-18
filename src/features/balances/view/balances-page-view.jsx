import {
  Box,
  Typography
} from '@material-ui/core';
import { BalanceAddView } from './balance-add-view';
import { BalancesListView } from './balances-list-view';

export function BalancesPageView ({
  balances,
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
          Balances
        </Typography>
        <BalanceAddView
          accounts={accounts}
          onAdd={onAdd}
          error={errorAdd}
          isLoading={isLoading}
          t={t}
        />
      </Box>
      <BalancesListView
        balances={balances}
        accounts={accounts}
        onDel={onDel}
        onEdit={onEdit}
        errorEdit={errorEdit}
        isLoading={isLoading}
        t={t}
      />
    </div>
  );
}
