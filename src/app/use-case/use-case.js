import { useState, useEffect, useRef } from 'react';

export function useCase (myUseCase, dependencies = {}) {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  // isMounted prevents state updates after the component unmount
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const run = async payload => {
    if (isRunning) return;

    setIsRunning(true);
    setError(null);

    try {
      await myUseCase(payload, dependencies);
    } catch (error) {
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setIsRunning(false);
    }
  };

  return { run, isRunning, error };
}
