export function InputOptions (props) {
  const { value, options, valueKey, labelKey, onChange, ...rest } = props;

  return (
    <select
      value={value}
      onChange={onChange}
      {...rest}
    >
      {options.map(o => (
        <option key={o[valueKey]} value={o[valueKey]}>
          {o[labelKey]}
        </option>
      ))}
    </select>
  );
}
