import { del } from "../../libs/request";

export async function plugEmulators({
  firestore,
  firestoreHost,
  fireauth,
  authHost,
}) {
  plugFireauthEmulator({ fireauth, host: authHost });
  const authClear = clearFireauthEmulator({ fireauth, host: authHost });

  plugFirestoreEmulator({ firestore, host: firestoreHost });
  const firestoreClear = clearFirestoreEmulator({
    firestore,
    host: firestoreHost,
  });
  await Promise.all([authClear, firestoreClear]);
}

function plugFirestoreEmulator({ firestore, host }) {
  const settingsHost = firestore._delegate._settings.host;
  const isUnplugged = !settingsHost.includes(host);
  if (isUnplugged) {
    firestore.useEmulator("localhost", host);
  }
}

async function clearFirestoreEmulator({ firestore, host }) {
  const projectId = firestore.app.options.projectId;
  const clearUrl = `http://localhost:${host}/emulator/v1/projects/${projectId}/databases/(default)/documents`;
  await del(clearUrl);
}

function plugFireauthEmulator({ fireauth, host }) {
  fireauth.useEmulator(host, { disableWarnings: true });
}

async function clearFireauthEmulator({ fireauth, host }) {
  const projectId = fireauth.app.options.projectId;
  const clearUsersUrl = `${host}/emulator/v1/projects/${projectId}/accounts`;
  await del(clearUsersUrl);
}
