import { initFirebaseSuiteFromEnv } from "../services/firebase";
import { webMainBase } from "./web-base";

async function webMainOnline() {
  const { firestore: dbService, fireauth: authService } =
    await initFirebaseSuiteFromEnv();

  await webMainBase({ dbService, authService });
}

webMainOnline();
