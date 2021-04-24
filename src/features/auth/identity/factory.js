import 'firebase/auth';
import { plugEmulator } from './emulator';
import { signIn } from './sign-in';
import { subscribe } from './subscribe';

export async function createIdentityProvider (config) {
  const firebaseAuth = await initFireauth(config);
  const identityProvider = adaptFirebaseAuth(firebaseAuth);
  return identityProvider;
}

async function initFireauth (config) {
  const { app, authEmulatorHost } = config;

  const fireauth = app.auth();
  if (authEmulatorHost) {
    await plugEmulator(fireauth, authEmulatorHost);
  }

  return fireauth;
}

function adaptFirebaseAuth (fireauth) {
  return {
    subscribe: observer => subscribe(observer, fireauth),
    signIn: credentials => signIn(credentials, fireauth)
  };
}
