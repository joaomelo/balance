import { Loading, Center, Form, usePayload } from '../../../app/components';

export function SignInPageView ({ onSignIn, errors, isLoading }) {
  const initialPayload = { email: '', password: '' };
  const { payload, reset, bind } = usePayload(initialPayload);

  const onSubmit = async () => {
    await onSignIn(payload);
    reset();
  };

  return (
    <>
      <Center x y>
        <div>
          <h2>Sign in</h2>
          <Form onSubmit={onSubmit}>
            <Email
              {...bind('email')}
              error={errors.email}
            />
            <Password
              {...bind('password')}
              error={errors.password}
            />
            <p>{errors.escaped}</p>
            <Button />
          </Form>
        </div>
      </Center>
      <Loading isLoading={isLoading} />
    </>
  );
}

function Email ({ value, onChange, error }) {
  return (
    <div>
      <label htmlFor="inputEmail">Email address</label>
      <input
        id="inputEmail"
        value={value}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
}

function Password ({ value, onChange, error }) {
  return (
    <div>
      <label htmlFor="inputPassword">Password</label>
      <input
        id="inputPassword"
        type="password"
        value={value}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
}

function Button () {
  return (
    <button type="submit">
      Sign in
    </button>
  );
}
