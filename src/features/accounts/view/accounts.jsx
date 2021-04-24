import { Add } from './add';
import { List } from './list';

export function Accounts ({ dependencies }) {
  return (
    <>
      <Add dependencies={dependencies}/>
      <List dependencies={dependencies}/>
    </>
  );
}
