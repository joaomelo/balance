import { useState, useEffect, useRef } from 'react';

export function useAction (service, action, ...dependencies) {
  const [isActing, setIsActing] = useState(false);
  const [error, setError] = useState(null);

  // isMounted prevents state updates after the component unmount
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const act = async (...payloads) => {
    if (isActing) return;

    let success = true;

    setIsActing(true);
    setError(null);

    try {
      const args = [...dependencies, ...payloads];
      console.log({ args, dependencies, payloads });
      await service[action](...args);
    } catch (error) {
      console.error(error);
      success = false;
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setIsActing(false);
    }

    return success;
  };

  return [act, isActing, error];
}
