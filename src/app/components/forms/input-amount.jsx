export function InputAmount ({ value, onChange, ...rest }) {
  const handleChange = e => {
    const amount = parseFloat(e.target.value) || null;
    onChange(amount);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      {...rest}
      type="number"
      step="0.01"
    />
  );
}
