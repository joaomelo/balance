import { useState } from 'react';
import { GridToolbar, DataGrid } from '@material-ui/data-grid';
import { DateTime } from 'luxon';
import { ActionCell } from '../../../components/action-cell';
import { useSwitch } from '../../../components/switch';
import { BalanceDialogView } from './view-dialog';

export function BalancesListView ({
  accounts,
  balances,
  onDel,
  onEdit,
  errorEdit,
  isLoading
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleEditClick = id => {
    const { accountId, amount, date } = balances.find(b => b.id === id);
    setInitialPayload({ id, accountId, amount, date });
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
            onDelClick={id => onDel({ id })}
            onEditClick={handleEditClick}
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
        disableSelectionOnClick
      />
      {isOpen &&
        <BalanceDialogView
          initialPayload={initialPayload}
          accounts={accounts}
          error={errorEdit}
          onSubmit={onEdit}
          isOpen={isOpen}
          onClose={close}
          isLoading={isLoading}
        />
      }
    </>
  );
}
