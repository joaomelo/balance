import { useState, useEffect } from 'react';

export function useQuery (source) {
  const [value, setValue] = useState(source.current);

  const subscribe = () => source.subscribe(() => {
    setValue(source.current);
    console.log({ current: source.current });
  });
  useEffect(subscribe, [source]);

  return value;
}
