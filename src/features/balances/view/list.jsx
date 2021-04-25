import { useGetter } from '../../../app/store';

export function List ({ dependencies }) {
  const { balancesStore } = dependencies;
  const balances = useGetter(balancesStore, 'allItems', []);

  return (
    <>
      <h2>Balances</h2>
      <table>
        <thead>
          <th>Account</th>
          <th>Date</th>
          <th>Amount</th>
        </thead>
        <tbody>
          {balances.map(b => <Balance key={b.id} balance={b} dependencies={dependencies} />)}
        </tbody>
      </table>
    </>
  );
}

export function Balance ({ balance, dependencies }) {
  const { id, accountId, date, amount } = balance;

  const { accountsStore } = dependencies;
  const account = accountsStore.getters.itemById(accountId);

  return (
    <tr id={id}>
      <td>{account.name}</td>
      <td>{date}</td>
      <td>{amount}</td>
    </tr>
  );
}
