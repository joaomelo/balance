const webpackTemplate = (params) => ({
  styles: ["bgWhiteBright", "blueBright"],
  relay: [
    { command: "rimraf dist/*" },
    { command: `webpack ${params} --config webpack.config.js` },
  ],
});

export const serversLocal = {
  rally: [
    {
      styles: ["bgYellow", "whiteBright"],
      command: "firebase emulators:start",
    },
    webpackTemplate("serve --env devLocal"),
  ],
};

const testTemplateLocal = (params = "", env = {}) => ({
  race: [
    serversLocal,
    {
      relay: [
        { command: "wait-on http://localhost:8181" },
        {
          styles: ["bgGreenBright", "whiteBright"],
          command: `jest --detectOpenHandles --setupTestFrameworkScriptFile=./tests/config/local.js ${params}`,
          env,
        },
      ],
    },
  ],
});
export const testLocal = testTemplateLocal();
export const testLocalWatch = testTemplateLocal("--watchAll");
export const testLocalDebug = testTemplateLocal("--testTimeout=5000000", {
  PWDEBUG: 1,
});

const lint = { command: "eslint --ext .js,.jsx src/" };

export const deployFromLocal = {
  relay: [
    lint,
    testLocal,
    {
      name: "buid",
      ...webpackTemplate("--env prodLocal"),
    },
    {
      name: "deploy",
      command: "firebase deploy",
    },
  ],
};

export const deployFromCi = {
  // "npm run prod:local:lint && npm run prod:ci:test && npm run prod:ci:build && firebase deploy",
  relay: [
    lint,
    testLocal,
    {
      name: "buid",
      ...webpackTemplate("--env prodLocal"),
    },
    {
      name: "deploy",
      command: "firebase deploy",
    },
  ],
};
