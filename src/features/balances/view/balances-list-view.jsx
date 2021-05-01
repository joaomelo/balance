export function BalancesListView ({ accounts, balances }) {
  const renderBalance = b => <Balance
      key={b.id}
      balance={b}
      accounts={accounts}
    />;

  return (
    <table>
      <thead>
        <th>Account</th>
        <th>Date</th>
        <th>Amount</th>
      </thead>
      <tbody>
        {balances.map(renderBalance)}
      </tbody>
    </table>
  );
}

export function Balance ({ balance, accounts }) {
  const { accountId, date, amount } = balance;
  const { name } = accounts.find(a => a.id === accountId);

  return (
    <tr>
      <td>{name}</td>
      <td>{date}</td>
      <td>{amount}</td>
    </tr>
  );
}
