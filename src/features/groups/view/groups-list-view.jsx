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
    const group = groups.find(a => a.id === id);
    setInitialPayload(group);
    open();
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Group',
      flex: 1
    },
    {
      field: 'accounts',
      headerName: 'accounts',
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
        rows={groups}
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
