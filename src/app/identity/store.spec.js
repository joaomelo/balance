import { credentials } from '../../../tests/fixtures';
import { initFirebaseSuiteFromEnv } from '../firebase';
import { storeUser, selectUserId, selectIsSignedIn } from './store';
import { createMutations } from './mutations';

describe('user store and selectors', () => {
  let app, fireauth, mutations;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    fireauth = suite.fireauth;
    mutations = createMutations(fireauth);
  });

  afterAll(() => app.delete());

  test('correctly represent initial state', () => {
    const userStore = storeUser(fireauth);
    const userIdSelector = selectUserId(userStore);
    const isSignedInSelector = selectIsSignedIn(userStore);

    expect(userStore.current).toBeNull();
    expect(userIdSelector.current).toBeNull();
    expect(isSignedInSelector.current).toBeFalsy();
  });

  test('correctly update state after mutations', async () => {
    const userStore = storeUser(fireauth);
    const userIdSelector = selectUserId(userStore);
    const isSignedInSelector = selectIsSignedIn(userStore);

    await mutations.signIn(credentials[0]);

    expect(userStore.current).toMatchObject({
      id: expect.any(String),
      email: credentials[0].email
    });
    expect(userIdSelector.current).toEqual(expect.any(String));
    expect(isSignedInSelector.current).toBeTruthy();

    await mutations.signOut();

    expect(userStore.current).toBeNull();
    expect(userIdSelector.current).toBeNull();
    expect(isSignedInSelector.current).toBeFalsy();
  });
});
