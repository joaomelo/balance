import { useState } from "react";
import { GridToolbar, DataGrid } from "@material-ui/data-grid";
import { DateTime } from "luxon";
import { ActionCell } from "../../../libs/components/action-cell";
import { useSwitch } from "../../../libs/hooks/switch";
import { AccountDialogView } from "./view-dialog";

export function AccountsListView({
  accounts,
  groups,
  onDel,
  onEdit,
  error,
  isLoading,
}) {
  const [initialPayload, setInitialPayload] = useState({});
  const [isOpen, open, close] = useSwitch();

  const handleEditClick = (id) => {
    const { name, groupId } = accounts.find((a) => a.id === id);
    setInitialPayload({ id, name, groupId });
    open();
  };

  const columns = [
    {
      field: "name",
      headerName: "Account",
      flex: 1,
    },
    {
      field: "groupName",
      headerName: "Group",
      flex: 1,
    },
    {
      field: "date",
      type: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (params) => DateTime.fromJSDate(params.value).toISODate(),
    },
    {
      field: "amount",
      type: "number",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params) => {
        if (!params.value) return "";

        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        return formatter.format(params.value);
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: function ActionCellRender(params) {
        return (
          <ActionCell
            id={params.id}
            onDelClick={(id) => onDel({ id })}
            onEditClick={handleEditClick}
          />
        );
      },
    },
  ];

  const rows = accounts.map((a) => {
    const { balances, ...accountData } = a;
    const { date, amount } =
      balances.length > 0 ? balances[0] : { date: null, amount: null };
    return { date, amount, ...accountData };
  });

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        density="compact"
        components={{ Toolbar: GridToolbar }}
        sortModel={[{ field: "name", sort: "asc" }]}
        disableSelectionOnClick
      />
      {isOpen && (
        <AccountDialogView
          initialPayload={initialPayload}
          groups={groups}
          error={error}
          onSubmit={onEdit}
          isOpen={isOpen}
          onClose={close}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
