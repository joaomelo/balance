import { useGetter } from '../../../app/store';

export function List ({ dependencies }) {
  const { accountsStore } = dependencies;
  const accounts = useGetter(accountsStore, 'allItems', []);

  return (
    <>
      <h2>Accounts</h2>
      <ul>
        {accounts.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    </>
  );
}
