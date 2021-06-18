import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setAccountCommand, delAccountCommand } from '../commands';
import { AccountsPageView } from './accounts-page-view';

export function AccountsPagePresenter ({ dependencies }) {
  const { accountsWithBalancesSelector } = dependencies;
  const accounts = useQuery(accountsWithBalancesSelector);

  const [onAdd, isAdding, errorAdd] = useCommand(dependencies, setAccountCommand);
  const [onEdit, isEditing, errorEdit] = useCommand(dependencies, setAccountCommand);
  const [onDel, isDeleting] = useCommand(dependencies, delAccountCommand);

  const { useI18n } = dependencies;
  const { t } = useI18n();

  return (
    <AccountsPageView
      accounts={Object.values(accounts)}
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
