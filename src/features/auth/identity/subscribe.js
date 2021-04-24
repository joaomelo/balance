import { extractUser } from './extract-user';

export function subscribe (observer, fireauth) {
  const unsubscribe = fireauth.onAuthStateChanged(fireauthUser => {
    const user = extractUser(fireauthUser);
    observer(user);
  });

  return unsubscribe;
}
