import { useState } from 'react';
import { GridToolbar, DataGrid } from '@material-ui/data-grid';
import { DateTime } from 'luxon';
import { ActionCell, useSwitch } from '../../../app/components';
import { AccountDialogView } from './account-dialog-view';

export function AccountsListView ({
  accounts,
  onDel,
  onEdit,
  error,
  isLoading,
  t
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleEditClick = id => {
    const account = accounts.find(a => a.id === id);
    setInitialPayload(account);
    open();
  };

  const columns = [
    {
      field: 'name',
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
        if (!params.value) return '';

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
            onDelClick={id => onDel({ id })}
            onEditClick={handleEditClick}
          />
        );
      }
    }
  ];

  const rows = accounts.map(a => {
    const { id, name, balances } = a;
    const { date, amount } = balances.length > 0
      ? balances[0]
      : { date: null, amount: null };
    return { id, name, date, amount };
  });

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        density="compact"
        components={{ Toolbar: GridToolbar }}
        sortModel={[{ field: 'name', sort: 'asc' }]}
        disableSelectionOnClick
      />
      {isOpen &&
        <AccountDialogView
          initialPayload={initialPayload}
          error={error}
          onSubmit={onEdit}
          isOpen={isOpen}
          onClose={close}
          isLoading={isLoading}
          t={t}
        />
      }
    </>
  );
}
