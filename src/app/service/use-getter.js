import { useState, useEffect } from 'react';

export function useGetter (service, getter, initialValue = null) {
  const [value, setValue] = useState(initialValue);

  const subscribe = () => service.subscribe(({ getters }) => setValue(getters[getter]));

  useEffect(subscribe, [service, getter]);

  return value;
}
