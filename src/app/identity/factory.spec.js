import { initFirebaseSuiteFromEnv } from '../firebase';
import { createIdentityService } from './factory';

describe('identity provider factory module', () => {
  let app, fireauth;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    fireauth = suite.fireauth;
  });

  afterAll(() => {
    return app.delete();
  });

  test('correctly connect to emulator', async () => {
    const identityService = createIdentityService(fireauth);
    expect(identityService).toBeDefined();
  });
});
