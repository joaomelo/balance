import { useAction } from '../../../app/components';
import { createErrorReport } from '../../../app/error';
import { signInCase } from '../cases';
import { SignInPageView } from './sign-in-page-view';

export function SignInPagePresenter ({ dependencies }) {
  const [onSignIn, isSigning, error] = useAction(signInCase, dependencies);
  const errors = createErrorReport(error, {
    email: 'AUTH/EMAIL_INVALID',
    password: 'AUTH/PASSWORD_INVALID'
  });

  return (
    <SignInPageView
      onSignIn={onSignIn}
      errors={errors}
      isLoading={isSigning}
    />
  );
}
