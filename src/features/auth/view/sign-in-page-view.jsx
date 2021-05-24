import { appName, appVersion } from '../../../app/helpers';
import { Loading, Center, Form, ErrorMessage } from '../../../app/components';
import { usePayload } from '../../../app/hooks';

export function SignInPageView ({ onSignIn, errors, isLoading }) {
  const initialPayload = { email: '', password: '' };
  const { payload, reset, bind } = usePayload(initialPayload);

  const onSubmit = async () => {
    await onSignIn(payload);
    reset();
  };

  return (
    <>
      <Center main cross>
        <div>
          <h1>{appName().toUpperCase()} - <small>v{appVersion()}</small></h1>
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
            <ErrorMessage code={errors.escaped}/>
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
      <ErrorMessage code={error}/>
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
      <ErrorMessage code={error}/>
    </div>
  );
}

function Button () {
  return (
    <button
      id="buttonSignIn"
      type="submit"
    >
      Sign in
    </button>
  );
}
