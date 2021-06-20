import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { DeleteTwoTone, EditTwoTone } from '@material-ui/icons';
import { GridToolbar, DataGrid } from '@material-ui/data-grid';
import { DateTime } from 'luxon';
import { useSwitch } from '../../../app/components';
import { BalanceDialogView } from './balance-dialog-view';

export function BalancesListView ({
  accounts,
  balances,
  onDel,
  onEdit,
  errorEdit,
  isLoading,
  t
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleClaimEdit = id => {
    const balance = balances.find(b => b.id === id);
    setInitialPayload(balance);
    open();
  };

  const columns = [
    {
      field: 'accountName',
      headerName: 'Account',
      flex: 1
    },
    {
      field: 'date',
      type: 'date',
      headerName: 'Date',
      flex: 1,
      valueFormatter: params => DateTime.fromJSDate(params.value).toISODate()
    },
    {
      field: 'amount',
      type: 'number',
      headerName: 'Amount',
      flex: 1,
      valueFormatter: (params) => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        });
        return formatter.format(params.value);
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: function ActionCellRender (params) {
        return (
          <ActionCell
            id={params.id}
            onDel={onDel}
            onClaimEdit={handleClaimEdit}
          />
        );
      }
    }
  ];

  return (
    <>
      <DataGrid
        rows={balances}
        columns={columns}
        autoPageSize
        density="compact"
        components={{ Toolbar: GridToolbar }}
        sortModel={[{ field: 'date', sort: 'desc' }]}
      />
      {isOpen &&
        <BalanceDialogView
          initialPayload={initialPayload}
          accounts={accounts}
          error={errorEdit}
          onSubmit={onEdit}
          isOpen={isOpen}
          onClose={close}
          t={t}
          isLoading={isLoading}
        />
      }
    </>
  );
}

function ActionCell ({ id, onDel, onClaimEdit }) {
  return (
    <>
      <IconButton
        size="small"
        onClick={() => onClaimEdit(id)}
      >
        <EditTwoTone fontSize="inherit" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => onDel({ id })}
      >
        <DeleteTwoTone fontSize="inherit" />
      </IconButton>
    </>
  );
}
