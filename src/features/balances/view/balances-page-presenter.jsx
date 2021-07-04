import { useCommand } from '../../../app/components';
import { useQuery } from '../../../app/query';
import { setBalanceCommand, delBalanceCommand } from '../commands';
import { BalancesPageView } from './balances-page-view';

export function BalancesPagePresenter ({ dependencies }) {
  const {
    accountsWithRelationshipsSelector,
    balancesWithRelationshipsSelector,
    userIdSelector,
    balancesMutations
  } = dependencies;

  const accounts = useQuery(accountsWithRelationshipsSelector);
  const balances = useQuery(balancesWithRelationshipsSelector);
  const userId = useQuery(userIdSelector);

  const commandsDependencies = {
    balancesMutations,
    accounts,
    balances,
    userId
  };

  const [
    onAdd,
    isAdding,
    errorAdd
  ] = useCommand(commandsDependencies, setBalanceCommand);

  const [
    onEdit,
    isEditing,
    errorEdit
  ] = useCommand(commandsDependencies, setBalanceCommand);

  const [
    onDel,
    isDeleting
  ] = useCommand(commandsDependencies, delBalanceCommand);

  const { useI18n } = dependencies;
  const { t } = useI18n();

  return (
    <BalancesPageView
      balances={balances}
      accounts={accounts}
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
