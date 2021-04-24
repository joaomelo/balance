import { useState } from 'react';

export function usePayload (initialValue = {}) {
  const [payload, setPayload] = useState(initialValue);

  const updatePayload = partial => {
    setPayload(state => ({
      ...state,
      ...partial
    }));
  };

  return { payload, updatePayload };
}
