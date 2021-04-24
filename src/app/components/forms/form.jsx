export function Form ({ onSubmit, children }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      { children }
    </form>
  );
}
