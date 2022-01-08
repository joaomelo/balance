import { initFirebaseSuite } from "../services/firebase";
import { webMainBase } from "./web-base";
import { collectFirebaseConfigFromEnv } from "./firebase-config";

webMainOnline();

async function webMainOnline() {
  const config = collectFirebaseConfigFromEnv();
  const { firestore: dbDriver, fireauth: authDriver } =
    initFirebaseSuite(config);
  await webMainBase({ dbDriver, authDriver });
}
