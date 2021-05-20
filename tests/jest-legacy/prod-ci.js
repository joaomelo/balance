import { disableFireauthConsoleWarning } from './common';

// other env variables are already set from ci pipeline
process.env.INTEGRATION_TESTS = true;
disableFireauthConsoleWarning();
