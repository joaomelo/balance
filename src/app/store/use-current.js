import { useState, useEffect } from 'react';

export function useCurrent (source) {
  const [value, setValue] = useState(source.current);

  const subscribe = () => source.subscribe(() => setValue(source.current));
  useEffect(subscribe, [source]);

  return value;
}
