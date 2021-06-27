import { useState } from 'react';
import { GridToolbar, DataGrid } from '@material-ui/data-grid';
import { ActionCell, useSwitch } from '../../../app/components';
import { GroupDialogView } from './group-dialog-view';

export function GroupsListView ({
  groups,
  onDel,
  onEdit,
  error,
  isLoading,
  t
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleEditClick = id => {
    const { name } = groups.find(a => a.id === id);
    setInitialPayload({ id, name });
    open();
  };

  const rows = groups.map(g => {
    const { accounts, ...groupData } = g;
    const accountsNames = accounts
      .map(({ name }) => name)
      .join(', ');
    return { accountsNames, ...groupData };
  });

  const columns = [
    {
      field: 'name',
      headerName: 'Group',
      flex: 1
    },
    {
      field: 'accountsNames',
      headerName: 'Accounts',
      flex: 1
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
        rows={rows}
        columns={columns}
        autoPageSize
        density="compact"
        components={{ Toolbar: GridToolbar }}
        sortModel={[{ field: 'name', sort: 'asc' }]}
        disableSelectionOnClick
      />
      {isOpen &&
        <GroupDialogView
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
