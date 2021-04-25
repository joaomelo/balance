export function Form ({ onSubmit, onSuccess, children }) {
  const handleSubmit = async e => {
    e.preventDefault();
    const success = await onSubmit();
    if (success && onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      { children }
    </form>
  );
}
