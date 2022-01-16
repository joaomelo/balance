const webpackTemplate = (params = "", env = {}) => ({
  relay: [
    { name: "clean-dist", command: "rimraf dist/*" },
    {
      name: "webpack",
      styles: ["bgWhiteBright", "blueBright"],
      command: `webpack ${params} --config webpack.config.js`,
      env,
    },
  ],
});

const serversTemplate = (extraEnv = {}) => ({
  rally: [
    {
      name: "firebase-emulators",
      styles: ["bgYellow", "whiteBright"],
      command: "firebase emulators:start",
    },
    {
      relay: [
        {
          name: "wait-on-emulators",
          command: "wait-on http://localhost:4400",
        },
        webpackTemplate("serve", [
          {
            APP_ENV_MODE: "DEVELOPMENT",
            APP_ENV_FIXTURE_LEVEL: "full",
          },
          extraEnv,
        ]),
      ],
    },
  ],
});
const serversLocal = serversTemplate(".env");
const serversCi = serversTemplate();

const testTemplate = (params = "", env = {}) => ({
  relay: [
    {
      name: "wait-on-web",
      command: "wait-on http://localhost:8181",
    },
    {
      name: "jest",
      styles: ["bgGreenBright", "whiteBright"],
      command: `jest --detectOpenHandles --setupTestFrameworkScriptFile=./tests/config/config.js ${params}`,
      env,
      args: true,
    },
  ],
});
const testTemplateLocal = (params = "", extraEnv = {}) => ({
  race: [serversLocal, testTemplate(params, [".env", extraEnv])],
});
const testLocal = testTemplateLocal("--forceExit");
const testLocalWatch = testTemplateLocal("--watchAll");
const testLocalDebug = testTemplateLocal("--testTimeout=5000000", {
  PWDEBUG: 1,
});
const testCi = {
  race: [serversCi, testTemplate("--forceExit --coverage")],
};

const buildTemplate = (extraEnv = {}) =>
  webpackTemplate("", [{ APP_ENV_MODE: "PRODUCTION" }, extraEnv]);
const buildCi = buildTemplate();
const buildLocal = buildTemplate(".env");

const deployTemplate = (...scripts) => ({
  relay: [
    { name: "lint", command: "eslint --ext .js,.jsx src/" },
    ...scripts,
    { name: "deploy", command: "firebase deploy" },
  ],
});
const deployFromLocal = deployTemplate(testLocal, buildLocal);
const deployFromCi = deployTemplate(testCi, buildCi);

export {
  serversLocal,
  testLocal,
  testLocalWatch,
  testLocalDebug,
  deployFromLocal,
  deployFromCi,
};
