import "core-js/stable";
import "regenerator-runtime/runtime";

import { initI18nProvider } from "../services/i18n";
import { messagesAuth } from "../features/auth";
import { mountRoot } from "../features/root";
import {
  initFirebaseSuite,
  collectFirebaseConfigFromEnv,
} from "../services/firebase";
import { createDependencies } from "./dependencies";
import { fixtureEnvironment } from "./fixtures";

main();

async function main() {
  const config = collectFirebaseConfigFromEnv();
  const { firestore, fireauth } = initFirebaseSuite(config);
  await fixtureEnvironment({ firestore, fireauth });

  await initI18nProvider([
    messagesAuth,
    // messagesBalance,
    // messagesAccount,
    // messagesGroups,
  ]);

  const dependencies = createDependencies({
    dbDriver: firestore,
    authDriver: fireauth,
  });
  mountRoot({
    element: "root",
    dependencies,
  });
}
