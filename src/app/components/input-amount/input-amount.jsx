export function InputAmount ({ value, onChange, ...rest }) {
  const handleChange = e => {
    const amount = parseFloat(e.target.value) || '';
    onChange(amount);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      type="number"
      step="0.01"
      {...rest}
    />
  );
}
