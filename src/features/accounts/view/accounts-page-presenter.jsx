import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setAccountCommand, delAccountCommand } from '../commands';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const {
    accountsWithRelationshipsSelector,
    activeGroupsSelector
  } = dependencies;

  const accounts = useQuery(accountsWithRelationshipsSelector);
  const groups = useQuery(activeGroupsSelector);

  const [onAdd, isAdding, errorAdd] = useCommand(dependencies, setAccountCommand);
  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setAccountCommand);
  const [onDel, isDeleting] = useCommand(dependencies, delAccountCommand);

  const { useI18n } = dependencies;
  const { t } = useI18n();

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
      t={t}
    />
  );
}
