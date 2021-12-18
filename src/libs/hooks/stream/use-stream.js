import { useState, useEffect } from "react";

export function useStream(stream) {
  const [value, setValue] = useState(stream.current);

  const subscribe = () => stream.subscribe(() => setValue(stream.current));
  useEffect(subscribe, [stream]);

  return value;
}
