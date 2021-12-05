import { credentials } from "../../../tests/fixtures";
import { initFirebaseSuite, plugEmulators } from "../services/firebase";
import { webMainBase } from "./web-base";
import {
  collectFirebaseConfig,
  collectEmulatorsConfig,
} from "./firebase-config";

webMainFixtured();

async function webMainFixtured() {
  const firebaseConfig = collectFirebaseConfig();
  const { firestore, fireauth } = initFirebaseSuite(firebaseConfig);

  const { authHost, firestoreHost } = collectEmulatorsConfig();
  await plugEmulators({ firestore, fireauth, authHost, firestoreHost });

  const dependencies = await webMainBase({
    dbService: firestore,
    authService: fireauth,
  });

  await injectFixtures(dependencies);
  window.$dependencies = dependencies;
}

async function injectFixtures(dependencies) {
  console.log("fixtures");
  console.log(credentials);
  await createDefaultUser(fireauth, credentials[0]);
}

async function createDefaultUser(fireauth, userCredentials) {
  const { email, password } = userCredentials;
  await fireauth.createUserWithEmailAndPassword(email, password);
  await fireauth.signOut();
}
