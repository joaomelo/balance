import { MuiProvider } from "../../libs/mui";
import { BrowserRouter as Router } from "react-router-dom";
import { useStream } from "../../libs/hooks/stream";
import { useCommand } from "../../libs/hooks/command";
import { signOutCommand } from "../auth";
import { WrapperRoot } from "./wrapper-root";
import { WrapperPage } from "./wrapper-page";
import { AppNav } from "./app-nav";
import { CurrentPage } from "./current-page";

export function Root({ dependencies }) {
  const { isSignedInStream } = dependencies;
  const isSignedIn = useStream(isSignedInStream);
  const [onSignOut] = useCommand(dependencies, signOutCommand);

  return (
    <Providers>
      <WrapperRoot>
        <AppNav isSignedIn={isSignedIn} onSignOut={onSignOut} />
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
