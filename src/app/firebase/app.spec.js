import { initFirebaseSuiteFromEnv } from './app';

describe('firebase app module', () => {
  test('basic app initialization does no break', async () => {
    const suite = await initFirebaseSuiteFromEnv();
    const sameSuite = await initFirebaseSuiteFromEnv();

    expect(suite.app).toEqual(sameSuite.app);
  });
});
