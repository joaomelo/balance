export function collectFirebaseConfigFromEnv() {
  return {
    apiKey: process.env.APP_ENV_API_KEY,
    authDomain: process.env.APP_ENV_AUTH_DOMAIN,
    projectId: process.env.APP_ENV_PROJECT_ID,
    storageBucket: process.env.APP_ENV_STORAGE_BUCKET,
    messagingSender_id: process.env.APP_ENV_MESSAGING_SENDER_ID,
    appId: process.env.APP_ENV_APP_ID,
  };
}

export function collectEmulatorsConfigFromEnv() {
  return {
    authHost: process.env.APP_ENV_FIREAUTH_EMULATOR_HOST,
    firestoreHost: process.env.APP_ENV_FIRESTORE_EMULATOR_HOST,
  };
}
