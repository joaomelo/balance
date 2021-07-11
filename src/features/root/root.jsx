import { MuiProvider } from '../../app/mui';
import { useQuery } from '../../app/query';
import { useCommand } from '../../app/components/command';
import { signOutCommand } from '../auth';
import { WrapperRoot } from './wrapper-root';
import { WrapperPage } from './wrapper-page';
import { AppNav } from './app-nav';
import { CurrentPage } from './current-page';

export function Root ({ dependencies }) {
  const { isSignedInSelector } = dependencies;
  const isSignedIn = useQuery(isSignedInSelector);
  const [onSignOut] = useCommand(dependencies, signOutCommand);

  return (
    <MuiProvider>
      <WrapperRoot>
        <AppNav
          isSignedIn={isSignedIn}
          onSignOut={onSignOut}
        />
        <WrapperPage>
          <CurrentPage
            isSignedIn={isSignedIn}
            dependencies={dependencies}
          />
        </WrapperPage>
      </WrapperRoot>
    </MuiProvider>
  );
}
