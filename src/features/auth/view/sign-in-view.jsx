import { Loading, usePayload } from '../../../app/components';

export function SignInView ({ onSubmit, isLoading, errors }) {
  const { payload, updatePayload } = usePayload({ email: '', password: '' });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(payload);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputEmail">Email address</label>
            <input
              id="inputEmail"
              value={payload.email}
              onChange={e => updatePayload({ email: e.target.value })}
            />
            <p>{errors.email}</p>
          </div>
          <div>
            <label htmlFor="inputPassword">Password</label>
            <input
              id="inputPassword"
              type="password"
              value={payload.password}
              onChange={e => updatePayload({ password: e.target.value })}
            />
            <p>{errors.password}</p>
          </div>

          <p>{errors.escaped}</p>

          <button
            id="buttonSignIn"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
