export function ErrorMessage ({ code, message }) {
  if (!code) return null;

  return (
    <p data-error={code}>
      {message || code}
    </p>
  );
}
