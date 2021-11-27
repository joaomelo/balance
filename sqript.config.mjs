const fireEmulators = {
  name: "emulators",
  styles: ["bgYellow", "whiteBright"],
  command: "firebase emulators:start",
};

const serverLocal = {
  name: "server-local",
  styles: ["bgWhiteBright", "blueBright"],
  relay: [
    { command: "rimraf dist/*" },
    { command: "webpack serve --config webpack.config.js --env devLocal" },
  ],
};

export const devLocal = {
  name: "dev-local",
  rally: [fireEmulators, serverLocal],
};

// "dev:local:test": "jest --watchAll --detectOpenHandles --coverage=false --setupTestFrameworkScriptFile=./tests/config/dev-local.js",
export const testLocal = {
  name: "test-local",
  command:
    "jest --watchAll --detectOpenHandles --coverage=false --setupTestFrameworkScriptFile=./tests/config/dev-local.js",
};
