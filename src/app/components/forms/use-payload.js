import { useState } from 'react';

export function usePayload (initialValue = {}) {
  const [payload, setPayload] = useState(initialValue);

  const updatePayload = partial => {
    setPayload(state => ({
      ...state,
      ...partial
    }));
  };

  const resetPayload = () => {
    setPayload(initialValue);
  };

  return { payload, updatePayload, resetPayload };
}
