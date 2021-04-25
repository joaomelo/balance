import { useState, useEffect, useRef } from 'react';

export function useCase (myUseCase, dependencies = {}) {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  // isMounted prevents state updates after the component unmount
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const run = async payload => {
    if (isRunning) return;

    let success = true;

    setIsRunning(true);
    setError(null);

    try {
      await myUseCase(payload, dependencies);
    } catch (error) {
      success = false;
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setIsRunning(false);
    }

    return success;
  };

  return { run, isRunning, error };
}
