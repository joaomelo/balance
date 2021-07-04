import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setAccountCommand, delAccountCommand } from '../commands';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const {
    accountsWithRelationshipsSelector,
    balancesWithRelationshipsSelector,
    groupsWithRelationshipsSelector,
    accountsMutations,
    balancesMutations,
    userIdSelector
  } = dependencies;

  const accounts = useQuery(accountsWithRelationshipsSelector);
  const balances = useQuery(balancesWithRelationshipsSelector);
  const groups = useQuery(groupsWithRelationshipsSelector);
  const userId = useQuery(userIdSelector);

  const commandsDependencies = {
    accounts,
    balances,
    userId,
    accountsMutations,
    balancesMutations
  };
  const [onAdd, isAdding, errorAdd] = useCommand(commandsDependencies, setAccountCommand);
  const [onEdit, isEditing, errorEdit] = useCommand(commandsDependencies, setAccountCommand);
  const [onDel, isDeleting] = useCommand(commandsDependencies, delAccountCommand);

  return (
    <AccountsPageView
      accounts={accounts}
      groups={groups}
      onAdd={onAdd}
      errorAdd={errorAdd}
      onEdit={onEdit}
      errorEdit={errorEdit}
      onDel={onDel}
      isLoading={isAdding || isDeleting || isEditing}
    />
  );
}
