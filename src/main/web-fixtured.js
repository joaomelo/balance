import { credentials } from "../../tests/fixtures";
import { initFirebaseSuite, plugEmulators } from "../services/firebase";
import { webMainBase } from "./web-base";
import {
  collectFirebaseConfigFromEnv,
  collectEmulatorsConfigFromEnv,
} from "./firebase-config";

webMainFixtured();

async function webMainFixtured() {
  const config = collectFirebaseConfigFromEnv();
  const { firestore, fireauth } = initFirebaseSuite(config);

  const { authHost, firestoreHost } = collectEmulatorsConfigFromEnv();
  await plugEmulators({ firestore, fireauth, authHost, firestoreHost });

  const dependencies = await webMainBase({
    dbDriver: firestore,
    authDriver: fireauth,
  });

  await injectFixtures({ firestore, fireauth, ...dependencies });
  window.$dependencies = dependencies;
}

async function injectFixtures({ fireauth }) {
  console.info("injecting fixtures");
  await createDefaultUser(fireauth, credentials[0]);
  await populatingCollections();
}

async function createDefaultUser(fireauth, userCredentials) {
  const { email, password } = userCredentials;
  await fireauth.createUserWithEmailAndPassword(email, password);
  await fireauth.signOut();
}

function populatingCollections() {
  // todo
}
