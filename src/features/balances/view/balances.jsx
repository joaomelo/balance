import { Add } from './add';
import { List } from './list';

export function Balances ({ dependencies }) {
  return (
    <>
      <Add dependencies={dependencies}/>
      <List dependencies={dependencies}/>
    </>
  );
}
