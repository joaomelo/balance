const webpackTemplate = (params) => ({
  relay: [
    { name: "clean-dist", command: "rimraf dist/*" },
    {
      name: "webpack",
      styles: ["bgWhiteBright", "blueBright"],
      command: `webpack ${params} --config webpack.config.js`,
    },
  ],
});

const serversTemplate = (params) => ({
  rally: [
    {
      name: "firebase-emulators",
      styles: ["bgYellow", "whiteBright"],
      command: "firebase emulators:start",
    },
    webpackTemplate(`serve ${params}`),
  ],
});
const serversLocal = serversTemplate("--env devLocal");
const serversCi = serversTemplate("--env devCi");

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

const deployTemplate = (...scripts) => ({
  relay: [
    { name: "lint", command: "eslint --ext .js,.jsx src/" },
    ...scripts,
    { name: "deploy", command: "firebase deploy" },
  ],
});
const deployFromLocal = deployTemplate(testLocal, {
  name: "build",
  ...webpackTemplate("--env prodLocal"),
});
const deployFromCi = deployTemplate(testCi, {
  name: "build",
  ...webpackTemplate("--env prodCi"),
});

export {
  serversLocal,
  testLocal,
  testLocalWatch,
  testLocalDebug,
  deployFromLocal,
  deployFromCi,
};
