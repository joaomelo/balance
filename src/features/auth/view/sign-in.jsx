import { Loading, Form } from '../../../app/components';
import { useCase, usePayload } from '../../../app/hooks';
import { createErrorReport } from '../../../app/error';
import { signInCase } from '../cases';

export function SignIn ({ dependencies }) {
  const { run, isRunning, error } = useCase(signInCase, dependencies);
  const { payload, updatePayload } = usePayload({ email: '', password: '' });

  const errors = createErrorReport(error, {
    email: 'AUTH/EMAIL_INVALID',
    password: 'AUTH/PASSWORD_INVALID'
  });

  return (
    <>
      <Loading isLoading={isRunning} />
      <div>
        <h2>Sign in</h2>
        <Form onSubmit={() => run(payload)}>
          <Email
            value={payload.email}
            onChange={e => updatePayload({ email: e.target.value })}
            error={errors.email}
          />
          <Password
            value={payload.password}
            onChange={e => updatePayload({ password: e.target.value })}
            error={errors.password}
          />

          <p>{errors.escaped}</p>

          <Button />
        </Form>
      </div>
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
