import { del } from '../request';

export function plugEmulator (firestore, firestoreEmulatorHost) {
  const settingsHost = firestore._delegate._settings.host;
  const isUnplugged = !settingsHost.includes(firestoreEmulatorHost);

  if (isUnplugged) {
    firestore.useEmulator('localhost', firestoreEmulatorHost);
  }
}

export function clearFirestoreEmulator (projectId, firestoreEmulatorHost) {
  const clearUrl = `http://localhost:${firestoreEmulatorHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`;
  return del(clearUrl);
}
