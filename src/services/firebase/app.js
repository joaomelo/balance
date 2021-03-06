import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initFirestore } from './firestore';
import { initFireauth } from './fireauth';

export function initFirebaseSuiteFromEnv () {
  return initFirebaseSuite(createFirebaseConfigFromEnv());
}

export async function initFirebaseSuite (config) {
  const { authEmulator, firestoreEmulator, ...firebaseConfig } = config;

  const app = firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.apps[0];

  const firestore = await initFirestore(app, firestoreEmulator);
  const fireauth = await initFireauth(app, authEmulator);

  const suite = {
    app,
    firestore,
    fireauth
  };

  return suite;
}

function createFirebaseConfigFromEnv () {
  return {
    apiKey: process.env.APP_ENV_API_KEY,
    authDomain: process.env.APP_ENV_AUTH_DOMAIN,
    projectId: process.env.APP_ENV_PROJECT_ID,
    storageBucket: process.env.APP_ENV_STORAGE_BUCKET,
    messagingSender_id: process.env.APP_ENV_MESSAGING_SENDER_ID,
    appId: process.env.APP_ENV_APP_ID,
    authEmulator: process.env.APP_ENV_FIREAUTH_EMULATOR_HOST,
    firestoreEmulator: process.env.APP_ENV_FIRESTORE_EMULATOR_HOST
  };
}
