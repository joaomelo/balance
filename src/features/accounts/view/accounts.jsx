// import { ListView } from './list-view';
import { Add } from './add';

export function Accounts ({ dependencies }) {
  return (
    <>
      <Add dependencies={dependencies}/>
      {/* <ListView accounts={accounts}/> */}
    </>
  );
}
