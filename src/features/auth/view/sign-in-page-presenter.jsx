import { useCommand } from '../../../app/components';
import { signInCommand } from '../commands';
import { SignInPageView } from './sign-in-page-view';

export function SignInPagePresenter ({ dependencies }) {
  const [onSignIn, isSigning, error] = useCommand(dependencies, signInCommand);

  return (
    <SignInPageView
      onSignIn={onSignIn}
      error={error}
      isLoading={isSigning}
    />
  );
}
