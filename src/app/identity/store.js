import { store, select } from '../store';

export function storeUser (fireauth) {
  const userStore = store(null);

  const updateUser = fireauthUser => {
    const user = extractUser(fireauthUser);
    userStore.update(user);
  };
  fireauth.onAuthStateChanged(updateUser);

  return userStore;
}

export function selectUserId (userStore) {
  return select(userStore, user => user && user.id);
}

export function selectIsSignedIn (userStore) {
  return select(userStore, user => !!user);
}

function extractUser (fireauthUser) {
  if (!fireauthUser) return null;

  const user = {
    id: fireauthUser.uid,
    email: fireauthUser.email
  };

  return user;
}
