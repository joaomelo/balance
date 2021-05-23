import { query, select } from '../query';

export function queryUser (fireauth) {
  const userQuery = query(null);
  fireauth.onAuthStateChanged(driverUser => updateUser(userQuery, driverUser));
  return userQuery;
}

export function selectUserId (userQuery) {
  return select(userQuery, user => user && user.id);
}

export function selectIsSignedIn (userQuery) {
  return select(userQuery, user => !!user);
}

function updateUser (userQuery, driverUser) {
  const user = extractUser(driverUser);
  userQuery.update(user);
};

function extractUser (driverUser) {
  if (!driverUser) return null;

  const user = {
    id: driverUser.uid,
    email: driverUser.email
  };

  return user;
}
