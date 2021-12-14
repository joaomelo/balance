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
    // {
    //   name: "firebase-emulators",
    //   styles: ["bgYellow", "whiteBright"],
    //   command: "firebase emulators:start",
    // },
    webpackTemplate("serve", [
      {
        APP_ENV_MODE: "DEVELOPMENT",
        APP_ENV_ENTRY_FILE: "web-fixtured.js",
        APP_ENV_FIREAUTH_EMULATOR_HOST: "http://localhost:9099",
        APP_ENV_FIRESTORE_EMULATOR_HOST: "8080",
      },
      extraEnv,
    ]),
  ],
});
const serversLocal = serversTemplate(".env");
const serversCi = serversTemplate();

const testTemplate = (params = "", env = {}) => ({
  relay: [
    {
      name: "wait-on",
      command: "wait-on http://localhost:8181",
    },
    {
      name: "jest",
      styles: ["bgGreenBright", "whiteBright"],
      command: `jest --detectOpenHandles ${params}`,
      env,
    },
  ],
});
const testTemplateLocal = (params, env) => ({
  race: [
    serversLocal,
    testTemplate(
      `--setupTestFrameworkScriptFile=./tests/config/local.js ${params}`,
      env
    ),
  ],
});
const testLocal = testTemplateLocal("--forceExit");
const testLocalWatch = testTemplateLocal("--watchAll");
const testLocalDebug = testTemplateLocal("--testTimeout=5000000", {
  PWDEBUG: 1,
});
const testCi = {
  race: [
    serversCi,
    testTemplate(
      "--forceExit --coverage --setupTestFrameworkScriptFile=./tests/config/ci.js"
    ),
  ],
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
