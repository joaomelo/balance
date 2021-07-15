import { useSwitch } from './use-switch';

export function useToggle (initial = false) {
  const [isOn, , , setToggle] = useSwitch(initial);

  return [isOn, setToggle];
}
