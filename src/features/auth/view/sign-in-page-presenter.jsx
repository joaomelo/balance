import { useCommand } from '../../../app/hooks';
import { createErrorReport } from '../../../app/error';
import { signInCommand } from '../commands';
import { SignInPageView } from './sign-in-page-view';

export function SignInPagePresenter ({ dependencies }) {
  const { identityCommands } = dependencies;
  const [onSignIn, isSigning, error] = useCommand(signInCommand, { identityCommands });
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
