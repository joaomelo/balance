import {
  disableFireauthConsoleWarning,
  loadEnvFromFile
} from './common';

loadEnvFromFile('env-dev.env');
disableFireauthConsoleWarning();
