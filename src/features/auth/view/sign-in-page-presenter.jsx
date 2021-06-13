import { useCommand } from '../../../app/components';
import { signInCommand } from '../commands';
import { SignInPageView } from './sign-in-page-view';

export function SignInPagePresenter ({ dependencies }) {
  const [onSignIn, isSigning, error] = useCommand(dependencies, signInCommand);

  const { useI18n } = dependencies;
  const { t } = useI18n();

  return (
    <SignInPageView
      onSignIn={onSignIn}
      error={error}
      isLoading={isSigning}
      t={t}
    />
  );
}
