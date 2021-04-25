import { Loading } from '../../../app/components';
import { useCase } from '../../../app/use-case';
import { delAccountCase } from '../cases';

export function DelAccountView ({ id, dependencies }) {
  const { run, isRunning } = useCase(delAccountCase, dependencies);
  return (
    <>
      <Loading isLoading={isRunning} />
      <button onClick={() => run({ id })}>del</button>
    </>
  );
}
