import { useState, useEffect } from 'react';

export function useService (service, selector, ...args) {
  const [value, setValue] = useState(service[selector](...args));

  const subscribe = () => service.subscribe(() => setValue(service[selector](...args)));
  useEffect(subscribe, [service, selector, args]);

  return value;
}
