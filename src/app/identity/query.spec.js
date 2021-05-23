import { credentials } from '../../../tests/fixtures';
import { initFirebaseSuiteFromEnv } from '../firebase';
import { queryUser, selectUserId, selectIsSignedIn } from './query';
import { createIdentityCommands } from './commands';

describe('user query and selectors', () => {
  let app, fireauth, commands;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    fireauth = suite.fireauth;
    commands = createIdentityCommands(fireauth);
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

  test('correctly update state after commands', async () => {
    const userQuery = queryUser(fireauth);
    const userIdSelector = selectUserId(userQuery);
    const isSignedInSelector = selectIsSignedIn(userQuery);

    await commands.signIn(credentials[0]);

    expect(userQuery.current).toMatchObject({
      id: expect.any(String),
      email: credentials[0].email
    });
    expect(userIdSelector.current).toEqual(expect.any(String));
    expect(isSignedInSelector.current).toBeTruthy();

    await commands.signOut();

    expect(userQuery.current).toBeNull();
    expect(userIdSelector.current).toBeNull();
    expect(isSignedInSelector.current).toBeFalsy();
  });
});
