import path from 'path';
import dotenv from 'dotenv';
import { disableFireauthConsoleWarning } from './common';

const envFile = path.resolve(process.cwd(), 'env-dev.env');
dotenv.config({ path: envFile });

disableFireauthConsoleWarning();
