import { useState } from 'react';

export function useSwitch (initial = false) {
  const [isOn, setIsOn] = useState(initial);
  const setOn = () => setIsOn(true);
  const setOff = () => setIsOn(false);
  const setToggle = () => setIsOn(state => !state);

  return [isOn, setOn, setOff, setToggle];
}
