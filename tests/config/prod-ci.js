import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { disableFireauthConsoleWarning } from './common';

process.env.INTEGRATION_TESTS = true;
disableFireauthConsoleWarning();
