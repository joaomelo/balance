import { initFirebaseSuiteFromEnv } from '../../../app/firebase';
import { createIdentityService } from './factory';

describe('identity provider factory module', () => {
  test('correctly connect to emulator', async () => {
    const config = {
      ...initFirebaseSuiteFromEnv(),
      authEmulatorHost: process.env.FIREAUTH_EMULATOR_HOST
    };

    const identityProvider = await createIdentityService(config);

    expect(identityProvider).toBeDefined();
  });
});
