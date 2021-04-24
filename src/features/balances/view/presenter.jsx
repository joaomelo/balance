import { useGetter } from '../../../app/store';
import { addCase } from '../cases';
import { ListView } from './list-view';
import { AddView } from './add-view';

export function BalancesPresenter ({ dependencies }) {
  const { balancesStore } = dependencies;
  const balances = useGetter(balancesStore, 'allItems', []);

  const onAdd = balance => addCase(balance, dependencies);

  return (
    <>
      <AddView onAdd={onAdd}/>
      <ListView balances={balances}/>
    </>
  );
}
