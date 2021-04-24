import { useCase } from '../../../app/use-case';
import { createErrorReport } from '../../../app/error';
import { signInCase } from '../cases';
import { SignInView } from './sign-in-view';

export function SignInPresenter ({ dependencies }) {
  const { run, isRunning, error } = useCase(signInCase, dependencies);

  const errors = createErrorReport(error, {
    email: 'AUTH/EMAIL_INVALID',
    password: 'AUTH/PASSWORD_INVALID'
  });

  return (
    <>
      <SignInView
        onSubmit={run}
        isLoading={isRunning}
        errors={errors}
      />
    </>
  );
}
