import {
  disableFireauthConsoleWarning,
  loadEnvFromFile
} from './common';

loadEnvFromFile('.env');
disableFireauthConsoleWarning();
