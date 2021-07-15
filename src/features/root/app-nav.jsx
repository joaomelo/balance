import { useSwitch } from '../../app/components/switch';
import { AppTopbar } from './app-topbar';
import { AppSidebar } from './app-sidebar';

export function AppNav ({ isSignedIn, onSignOut }) {
  const [isOpen, open, close] = useSwitch();
  return (
    <>
      <AppTopbar
        showHamburger={isSignedIn}
        onHamburgerClick={open}
      />
      <AppSidebar
        isOpen={isOpen}
        onClose={close}
        onSignOut={onSignOut}
      />
    </>
  );
}
