import { asUtcIsoString } from '../../helpers';

export function InputDate ({ value, onChange }) {
  const strValue = asUtcIsoString(value);

  const handleChange = (e) => {
    const date = new Date(e.target.value);
    onChange(date);
  };

  return <input value={strValue} onChange={handleChange} type="date"/>;
}
