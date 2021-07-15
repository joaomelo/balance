import { MuiProvider } from '../../app/mui';
import { BrowserRouter as Router } from 'react-router-dom';
import { useQuery } from '../../libs/query';
import { useCommand } from '../../components/command';
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
    <Providers>
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
    </Providers>
  );
}

function Providers ({ children }) {
  return (
    <MuiProvider>
      <Router>
        {children}
      </Router>
    </MuiProvider>
  );
}
