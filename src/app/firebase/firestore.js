import { del } from '../request';

export async function initFirestore (app, firestoreEmulator) {
  const firestore = app.firestore();

  if (firestoreEmulator) {
    plugEmulator(firestore, firestoreEmulator);
    await clearFirestoreEmulator(firestore, firestoreEmulator);
  }

  return firestore;
}

function plugEmulator (firestore, firestoreEmulator) {
  const settingsHost = firestore._delegate._settings.host;
  const isUnplugged = !settingsHost.includes(firestoreEmulator);

  if (isUnplugged) {
    firestore.useEmulator('localhost', firestoreEmulator);
  }
}

export function clearFirestoreEmulator (firestore, firestoreEmulator) {
  const projectId = firestore.app.options.projectId;
  const clearUrl = `http://localhost:${firestoreEmulator}/emulator/v1/projects/${projectId}/databases/(default)/documents`;
  return del(clearUrl);
}
