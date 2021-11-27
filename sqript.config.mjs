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

const testTemplate = {
  styles: ["bgGreenBright", "whiteBright"],
};

export const testWatchLocal = {
  name: "test-watch-local",
  rally: [
    serversLocal,
    {
      ...testTemplate,
      command:
        "jest --watchAll --detectOpenHandles --coverage=false --setupTestFrameworkScriptFile=./tests/config/dev-local.js",
    },
  ],
};
