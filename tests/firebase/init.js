import {
  collectFirebaseConfigFromEnv,
  initFirebaseSuite,
  collectEmulatorsConfigFromEnv,
  plugEmulators,
} from "../../src/services/firebase";

export async function initEmulatedFirebaseFromEnv() {
  const config = collectFirebaseConfigFromEnv();
  const suite = initFirebaseSuite(config);
  const { firestore, fireauth } = suite;
  const { authHost, firestoreHost } = collectEmulatorsConfigFromEnv();
  await plugEmulators({ firestore, fireauth, authHost, firestoreHost });
  return suite;
}
