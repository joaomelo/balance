import { credentials } from '../../../../tests/fixtures';
import { del } from '../../../app/request';

export async function plugEmulator (fireauth, authEmulatorHost) {
  fireauth.useEmulator(authEmulatorHost, { disableWarnings: true });
  await clearUsers(fireauth, authEmulatorHost);
  await createDefaultUser(fireauth);
}

function clearUsers (fireauth, authEmulatorHost) {
  const projectId = fireauth.app.options.projectId;
  const clearUsersUrl = `${authEmulatorHost}/emulator/v1/projects/${projectId}/accounts`;
  return del(clearUsersUrl);
}

async function createDefaultUser (fireauth) {
  const { email, password } = credentials[0];
  await fireauth.createUserWithEmailAndPassword(email, password);
  await fireauth.signOut();
}
