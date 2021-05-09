import { Center, injectModal } from '../layout';
import { Backdrop } from './backdrop';
import { Spinner } from './spinner';

export function Loading ({ isLoading }) {
  if (!isLoading) return null;

  return injectModal(
    <Backdrop>
      <Center main cross>
        <Spinner />
      </Center>
    </Backdrop>
  );
}
