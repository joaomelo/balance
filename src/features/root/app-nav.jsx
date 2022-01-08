import { useSwitch } from "../../libs/hooks/switch";
import { AppTopbar } from "./app-topbar";
import { AppSidebar } from "./app-sidebar";

export function AppNav({ isSignedIn, signOut }) {
  const [isOpen, open, close] = useSwitch();
  return (
    <>
      <AppTopbar showHamburger={isSignedIn} onHamburgerClick={open} />
      <AppSidebar isOpen={isOpen} onClose={close} signOut={signOut} />
    </>
  );
}
