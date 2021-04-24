import { useState, useEffect } from 'react';

export function useGetter (store, getter, initialValue = null) {
  const [value, setValue] = useState(initialValue);

  const subscribe = () => store.subscribe(getters => setValue(getters[getter]));

  useEffect(subscribe, [store, getter]);

  return value;
}
