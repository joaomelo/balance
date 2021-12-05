import { initFirebaseSuite } from "../services/firebase";
import { webMainBase } from "./web-base";
import { collectFirebaseConfig } from "./firebase-config";

webMainOnline();

async function webMainOnline() {
  const config = collectFirebaseConfig();
  const { firestore: dbService, fireauth: authService } =
    initFirebaseSuite(config);
  await webMainBase({ dbService, authService });
}
