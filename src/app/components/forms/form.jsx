export function Form ({ onSubmit, children, ...props }) {
  const handleSubmit = async e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      {...props}
    >
      { children }
    </form>
  );
}
