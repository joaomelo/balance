import { useState } from 'react';

export function usePayload (initialValue = {}) {
  const [payload, setPayload] = useState(initialValue);

  const update = partial => {
    setPayload(state => ({
      ...state,
      ...partial
    }));
  };

  const reset = () => {
    setPayload(initialValue);
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
