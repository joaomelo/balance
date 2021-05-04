import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initFirestore } from './firestore';
import { initFireauth } from './fireauth';

export async function initFirebaseSuiteFromEnv () {
  await initFirebaseSuite(createFirebaseConfigFromEnv());
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
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSender_id: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    authEmulator: process.env.FIREAUTH_EMULATOR_HOST,
    firestoreEmulator: process.env.FIRESTORE_EMULATOR_HOST
  };
}
