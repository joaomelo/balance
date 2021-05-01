import { useCase } from '../../../app/components';
import { createErrorReport } from '../../../app/error';
import { signInCase } from '../cases';
import { SignInPageView } from './sign-in-page-view';

export function SignInPagePresenter ({ dependencies }) {
  const { run, isRunning, error } = useCase(signInCase, dependencies);
  const errors = createErrorReport(error, {
    email: 'AUTH/EMAIL_INVALID',
    password: 'AUTH/PASSWORD_INVALID'
  });

  return (
    <SignInPageView
      onSignIn={run}
      errors={errors}
      isLoading={isRunning}
    />
  );
}
