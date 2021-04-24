import { useCase } from '../../../app/use-case';
import { useGetter } from '../../../app/store';
import { addCase } from '../cases';
import { ListView } from './list-view';
import { AddView } from './add-view';

export function AccountsPresenter ({ dependencies }) {
  const { accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'allItems', []);

  const onAdd = account => addCase(account, dependencies);

  return (
    <>
      <AddView onAdd={onAdd}/>
      <ListView accounts={accounts}/>
    </>
  );
}
