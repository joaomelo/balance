import { initFirebaseSuiteFromEnv } from './app';

describe('firebase app module', () => {
  test('basic app initialization does no break', () => {
    const suite = initFirebaseSuiteFromEnv();
    const sameSuite = initFirebaseSuiteFromEnv();

    expect(suite.app).toEqual(sameSuite.app);
  });
});
