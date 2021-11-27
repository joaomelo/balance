const fireEmulators = {
  name: "firebase-emulators",
  styles: ["bgYellow", "whiteBright"],
  command: "firebase emulators:start",
};

const webServerLocal = {
  name: "web-server-local",
  styles: ["bgWhiteBright", "blueBright"],
  relay: [
    { command: "rimraf dist/*" },
    { command: "webpack serve --config webpack.config.js --env devLocal" },
  ],
};

export const serversLocal = {
  name: "servers-local",
  rally: [fireEmulators, webServerLocal],
};

const testTemplateDevLocal = (params) => ({
  styles: ["bgGreenBright", "whiteBright"],
  command: `jest --detectOpenHandles --coverage=false --setupTestFrameworkScriptFile=./tests/config/dev-local.js ${params}`,
});

export const testWatchLocal = {
  name: "test-watch-local",
  rally: [serversLocal, testTemplateDevLocal("--watchAll")],
};

export const testDebugLocal = {
  name: "test-debug-local",
  race: [
    serversLocal,
    {
      ...testTemplateDevLocal("--testTimeout=5000000"),
      env: { PWDEBUG: 1 },
    },
  ],
};

const lint = {
  name: "lint",
  command: "eslint --ext .js,.jsx src/",
};

export const deployFromLocal = {
  // "npm run prod:local:lint && npm run prod:local:test && npm run prod:local:build && firebase deploy",
  name: "deploy-from-local",
  rally: [lint],
};
