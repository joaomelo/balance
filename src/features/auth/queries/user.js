import { store, select } from "currentjs";

export function streamUser(dependencies) {
  const { authDriver } = dependencies;
  const userStream = storeUser(authDriver.onAuthStateChanged);
  const userIdStream = selectUserId(userStream);
  const authStatusStream = selectAuthStatus(userStream);
  const isSignedInStream = selectIsSignedIn(userStream);

  return {
    userStream,
    userIdStream,
    authStatusStream,
    isSignedInStream,
  };
}

function storeUser(onAuthStateChanged) {
  const userStream = store(undefined);
  onAuthStateChanged((user) => userStream.update(user));
  return userStream;
}

function selectUserId(userStream) {
  return select(userStream, (user) => user && user.uid);
}

function selectAuthStatus(userStream) {
  const project = (user) => {
    if (user) return "SIGNED_IN";
    if (user === null) return "SIGNED_OUT";
    return "UNSOLVED";
  };

  return select(userStream, project);
}

function selectIsSignedIn(userStream) {
  return select(userStream, (user) => !!user);
}
