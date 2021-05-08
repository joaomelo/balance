import { initFirebaseSuiteFromEnv } from '../firebase';
import { createIdentityService } from './factory';

describe('identity provider factory module', () => {
  test('correctly connect to emulator', async () => {
    const { fireauth } = await initFirebaseSuiteFromEnv();
    const identityService = createIdentityService(fireauth);
    expect(identityService).toBeDefined();
  });
});
