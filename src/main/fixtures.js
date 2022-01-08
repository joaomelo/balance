import { credentials } from "../../tests/fixtures";
import {
  collectEmulatorsConfigFromEnv,
  plugEmulators,
} from "../services/firebase";

export async function fixtureEnvironment(dependencies) {
  const fixtureLevel = resolveFixtureLevel();
  if (!["base", "full"].includes(fixtureLevel)) return;

  const { firestore, fireauth } = dependencies;
  const { authHost, firestoreHost } = collectEmulatorsConfigFromEnv();
  await plugEmulators({ firestore, fireauth, authHost, firestoreHost });

  if (fixtureLevel !== "full") return;

  await injectFixtures(dependencies);
}

function resolveFixtureLevel() {
  let fixtureLevel;
  try {
    fixtureLevel = process.env.APP_ENV_FIXTURE_LEVEL;
  } catch {
    fixtureLevel = "none";
  }

  return fixtureLevel;
}

async function injectFixtures({ authCommands }) {
  console.info("injecting fixtures");
  await authCommands.createUser(credentials[0]);
  await populatingCollections();
}

function populatingCollections() {
  // todo
}
