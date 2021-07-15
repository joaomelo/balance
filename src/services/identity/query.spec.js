import { credentials } from '../../../tests/fixtures';
import { initFirebaseSuiteFromEnv } from '../firebase';
import { queryUser, selectUserId, selectIsSignedIn } from './query';
import { createIdentityMutations } from './mutations';

describe('user query and selectors', () => {
  let app, fireauth, mutations;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    fireauth = suite.fireauth;
    mutations = createIdentityMutations(fireauth);
  });

  afterAll(() => app.delete());

  test('correctly represent initial state', () => {
    const userQuery = queryUser(fireauth);
    const userIdSelector = selectUserId(userQuery);
    const isSignedInSelector = selectIsSignedIn(userQuery);

    expect(userQuery.current).toBeNull();
    expect(userIdSelector.current).toBeNull();
    expect(isSignedInSelector.current).toBeFalsy();
  });

  test('correctly update state after mutations', async () => {
    const userQuery = queryUser(fireauth);
    const userIdSelector = selectUserId(userQuery);
    const isSignedInSelector = selectIsSignedIn(userQuery);

    await mutations.signIn(credentials[0]);

    expect(userQuery.current).toMatchObject({
      id: expect.any(String),
      email: credentials[0].email
    });
    expect(userIdSelector.current).toEqual(expect.any(String));
    expect(isSignedInSelector.current).toBeTruthy();

    await mutations.signOut();

    expect(userQuery.current).toBeNull();
    expect(userIdSelector.current).toBeNull();
    expect(isSignedInSelector.current).toBeFalsy();
  });
});
