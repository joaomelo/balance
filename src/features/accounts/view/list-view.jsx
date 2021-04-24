export function ListView ({ accounts }) {
  return (
    <>
      <h2>Accounts</h2>
      <List accounts={accounts} />
    </>
  );
}

function List ({ accounts }) {
  return (
    <ul>
      { accounts.map(account => <ListItem key={account.id} account={account} />) }
    </ul>
  );
}

function ListItem ({ account }) {
  return (
    <li>{ account.name }</li>
  );
}
