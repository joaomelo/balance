import { credentials } from '../../../../tests/fixtures';
import { del } from '../../../app/request';

export async function initFireauth (app, authEmulator) {
  const fireauth = app.auth();

  if (authEmulator) {
    plugEmulator(fireauth, authEmulator);
    await clearUsers(fireauth, authEmulator);
    await createDefaultUser(fireauth, credentials[0]);
  }

  return fireauth;
}

export function plugEmulator (fireauth, authEmulator) {
  fireauth.useEmulator(authEmulator, { disableWarnings: true });
}

function clearUsers (fireauth, authEmulator) {
  const projectId = fireauth.app.options.projectId;
  const clearUsersUrl = `${authEmulator}/emulator/v1/projects/${projectId}/accounts`;
  return del(clearUsersUrl);
}

async function createDefaultUser (fireauth, userCredentials) {
  const { email, password } = userCredentials;
  await fireauth.createUserWithEmailAndPassword(email, password);
  await fireauth.signOut();
}
