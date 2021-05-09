import { useState, useEffect } from 'react';

export function useSelector (service, selector, arg) {
  const [value, setValue] = useState(service[selector](arg));

  const subscribe = () => service.subscribe(() => setValue(service[selector](arg)));
  useEffect(subscribe, [service, selector, arg]);

  return value;
}
