import { initFirebaseSuiteFromEnv, plugEmulators } from "../services/firebase";
import { webMainBase } from "./web-base";

async function webMainOnline() {
  const { firestore, fireauth } = await initFirebaseSuiteFromEnv();
  await plugEmulators({ firestore, fireauth });
  await injectFixtures({ firestore, fireauth });

  const dependencies = await webMainBase({
    dbService: firestore,
    authService: fireauth,
  });
  window.$dependencies = dependencies;
}

webMainOnline();
