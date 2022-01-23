import { useState } from "react";
import { GridToolbar, DataGrid } from "@material-ui/data-grid";
import { DateTime } from "luxon";
import { ActionCell } from "../../../libs/components/action-cell";
import { useCommand } from "../../../libs/hooks/command";
import { useStream } from "../../../libs/hooks/stream";
import { useSwitch } from "../../../libs/hooks/switch";
import { AccountDialog } from "./dialog";

export function AccountsList({ dependencies }) {
  const { accountsQuery, accountsCommands } = dependencies;

  const accounts = useStream(accountsQuery);
  const rows = accounts.map(mapAccountToRow);

  const [del] = useCommand(accountsCommands.del);

  const [isOpen, open, close] = useSwitch();
  const [initialPayload, setInitialPayload] = useState({});
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
            onDelClick={(id) => del({ id })}
            onEditClick={handleEditClick}
          />
        );
      },
    },
  ];

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
        <AccountDialog
          initialPayload={initialPayload}
          isOpen={isOpen}
          onClose={close}
          dependencies={dependencies}
        />
      )}
    </>
  );
}

function mapAccountToRow(a) {
  const { balances, ...accountData } = a;
  const { date, amount } =
    balances.length > 0 ? balances[0] : { date: null, amount: null };
  return { date, amount, ...accountData };
}
