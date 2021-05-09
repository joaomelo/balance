import {
  disableFireauthConsoleWarning,
  loadEnvFromFile
} from './common';

// dev file is used here to enable emulators
loadEnvFromFile('env-dev.env');
process.env.INTEGRATION_TESTS = true;

disableFireauthConsoleWarning();
