import { initFirebaseSuite } from "../services/firebase";
import { webMainBase } from "./web-base";
import { collectFirebaseConfigFromEnv } from "./firebase-config";

webMainOnline();

async function webMainOnline() {
  const config = collectFirebaseConfigFromEnv();
  const { firestore: dbService, fireauth: authService } =
    initFirebaseSuite(config);
  await webMainBase({ dbService, authService });
}
