import { MuiProvider } from "../../libs/mui";
import { BrowserRouter as Router } from "react-router-dom";
import { useStream } from "../../libs/hooks/stream";
import { useCommand } from "../../libs/hooks/command";
import { WrapperRoot } from "./wrapper-root";
import { WrapperPage } from "./wrapper-page";
import { AppNav } from "./app-nav";
import { CurrentPage } from "./current-page";

export function Root({ dependencies }) {
  const { userQueries, authCommands } = dependencies;
  const isSignedIn = useStream(userQueries.isSignedInStream);
  const [signOut] = useCommand(authCommands.signOut);

  return (
    <Providers>
      <WrapperRoot>
        <AppNav isSignedIn={isSignedIn} onSignOut={signOut} />
        <WrapperPage>
          <CurrentPage isSignedIn={isSignedIn} dependencies={dependencies} />
        </WrapperPage>
      </WrapperRoot>
    </Providers>
  );
}

function Providers({ children }) {
  return (
    <MuiProvider>
      <Router>{children}</Router>
    </MuiProvider>
  );
}
