import { asUtcIsoString } from '../../helpers';

export function InputDate ({ value, onChange, ...rest }) {
  const strValue = asUtcIsoString(value);

  const handleChange = e => {
    const date = new Date(e.target.value);
    onChange(isNaN(date) ? null : date);
  };

  return (
    <input
      value={strValue}
      onChange={handleChange}
      type="date"
      {...rest}
    />
  );
}
