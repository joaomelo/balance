import firebase from 'firebase/app';

export function initFirebaseSuiteFromEnv () {
  return initFirebaseSuite(createFirebaseConfigFromEnv());
}

export function initFirebaseSuite (config) {
  const app = firebase.apps.length === 0
    ? firebase.initializeApp(config)
    : firebase.apps[0];

  const suite = {
    app,
    projectId: app.options.projectId,
    firebase
  };

  return suite;
}

function createFirebaseConfigFromEnv () {
  return {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseUrl: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSender_id: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };
}
