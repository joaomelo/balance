import { useState, useEffect, useRef } from 'react';

export function useAction (service, action, ...dependencies) {
  const [isActing, setIsActing] = useState(false);
  const [error, setError] = useState(null);

  // isMounted prevents state updates after the component unmount
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const act = async (...payloads) => {
    if (isActing) return;

    setIsActing(true);
    setError(null);

    let success;
    try {
      const args = [...dependencies, ...payloads];
      await service[action](...args);
      success = true;
    } catch (error) {
      success = false;
      console.error(error);
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setIsActing(false);
    }

    return success;
  };

  return [act, isActing, error];
}
