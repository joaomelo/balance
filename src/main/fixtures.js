import { credentials, groups } from "../../tests/fixtures";
import {
  collectEmulatorsConfigFromEnv,
  plugEmulators,
} from "../services/firebase";

export async function emulateNewEnvironment({ firestore, fireauth }) {
  const fixtureLevel = resolveFixtureLevel();
  if (!["base", "full"].includes(fixtureLevel)) return;

  console.info("connecting with local emulators");
  const { authHost, firestoreHost } = collectEmulatorsConfigFromEnv();
  await plugEmulators({ firestore, fireauth, authHost, firestoreHost });
}

export async function populateEnvironment({ authCommands, groupsCommands }) {
  const fixtureLevel = resolveFixtureLevel();
  if (fixtureLevel !== "full") return;

  console.info("populating service with fixtures");
  await authCommands.signUp(credentials[0]);
  await groupsCommands.set(groups);
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
