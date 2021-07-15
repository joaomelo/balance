import { InnerChart } from './inner-chart';
import { InnerEmpty } from './inner-empty';

export function DateChart (props) {
  const { datasets } = props;
  const hasData = Array.isArray(datasets) && datasets.length > 0;

  return (
    hasData
      ? <InnerChart {...props}/>
      : <InnerEmpty {...props}/>
  );
}
