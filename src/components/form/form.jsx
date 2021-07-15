export function Form ({ onSubmit, ...props }) {
  const handleSubmit = async e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      {...props}
    />
  );
}
