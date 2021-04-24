import './local-dev';
import { disableFireauthConsoleWarning } from './common';

process.env.INTEGRATION_TESTS = true;
disableFireauthConsoleWarning();
