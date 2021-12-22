import { useCommand } from "../../../libs/hooks/command";
import { signInCommand } from "../commands";
import { SignInPageView } from "./view";

export function SignInPagePresenter({ dependencies }) {
  const [onSignIn, isSigning, error] = useCommand(dependencies, signInCommand);

  return (
    <SignInPageView onSignIn={onSignIn} error={error} isLoading={isSigning} />
  );
}
