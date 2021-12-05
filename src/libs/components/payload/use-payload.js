import { useState, useEffect, useRef } from 'react';

export function usePayload (initialValue = {}) {
  const [payload, setPayload] = useState(initialValue);

  // isMounted prevents state updates after the component unmount
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const update = partial => {
    isMounted.current && setPayload(state => ({
      ...state,
      ...partial
    }));
  };

  const reset = () => {
    isMounted.current && setPayload(initialValue);
  };

  const bind = key => {
    return {
      value: payload[key],
      onChange: arg => {
        const value = arg?.target ? arg.target.value : arg;
        update({ [key]: value });
      }
    };
  };

  return { payload, update, reset, bind };
}
