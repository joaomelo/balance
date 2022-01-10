import { useSwitch } from "../../libs/hooks/switch";
import { useStream } from "../../libs/hooks/stream";
import { AppTopbar } from "./app-topbar";
import { AppSidebar } from "./app-sidebar";

export function AppNav({ dependencies }) {
  const { userQueries } = dependencies;
  const isSignedIn = useStream(userQueries.isSignedInStream);

  const [isOpen, open, close] = useSwitch();
  return (
    <>
      <AppTopbar showHamburger={isSignedIn} onHamburgerClick={open} />
      <AppSidebar dependencies={dependencies} isOpen={isOpen} onClose={close} />
    </>
  );
}
