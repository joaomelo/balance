import { useAction } from '../../../app/service';
import { createErrorReport } from '../../../app/error';
import { SignInPageView } from './sign-in-page-view';

export function SignInPagePresenter ({ dependencies }) {
  const { authService } = dependencies;
  const [onSignIn, isSigning, error] = useAction(authService, 'signInCase');
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
