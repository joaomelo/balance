import "core-js/stable";
import "regenerator-runtime/runtime";

import { initI18nProvider } from "../services/i18n";
import { messagesAuth } from "../features/auth";
import { messagesAccounts } from "../features/accounts";
import { messagesBalances } from "../features/balances";
import { messagesGroups } from "../features/groups";
import { mountRoot } from "../features/root";
import {
  initFirebaseSuite,
  collectFirebaseConfigFromEnv,
} from "../services/firebase";
import { createQueries } from "./queries";
import { createCommands } from "./commands";
import { emulateNewEnvironment, populateEnvironment } from "./fixtures";

main();

async function main() {
  const config = collectFirebaseConfigFromEnv();
  const { firestore, fireauth } = initFirebaseSuite(config);
  await emulateNewEnvironment({ firestore, fireauth });

  await initI18nProvider([
    messagesAuth,
    messagesAccounts,
    messagesBalances,
    messagesGroups,
  ]);

  const queries = createQueries({
    dbDriver: firestore,
    authDriver: fireauth,
  });
  const commands = createCommands({
    dbDriver: firestore,
    authDriver: fireauth,
    ...queries,
  });

  await populateEnvironment(commands);

  mountRoot({
    element: "root",
    dependencies: {
      ...queries,
      ...commands,
    },
  });
}
