export function ListView ({ balances }) {
  return (
    <>
      <h2>Balances</h2>
      <List balances={balances} />
    </>
  );
}

function List ({ balances }) {
  return (
    <ul>
      { balances.map(balance => <ListItem key={balance.id} balance={balance} />) }
    </ul>
  );
}

function ListItem ({ balance }) {
  return (
    <li>{ balance.date }</li>
  );
}
