export function extractUser (fireauthUser) {
  if (!fireauthUser) return null;

  const user = {
    id: fireauthUser.uid,
    email: fireauthUser.email
  };

  return user;
}
