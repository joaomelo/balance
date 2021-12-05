import { initFirebaseSuiteFromEnv, plugEmulators } from "../services/firebase";
import { webMainBase } from "./web-base";

async function webMainOnline() {
  const { firestore, fireauth } = await initFirebaseSuiteFromEnv();
  await plugEmulators({ firestore, fireauth });

  const dependencies = await webMainBase({
    dbService: firestore,
    authService: fireauth,
  });

  await injectFixtures({ firestore, fireauth });
  window.$dependencies = dependencies;
}

webMainOnline();
