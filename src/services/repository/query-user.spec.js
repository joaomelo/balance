import { credentials } from '../../../tests/fixtures';
import { initFirebaseSuiteFromEnv } from '../firebase';
import { queryUser, selectUserId, createIdentityMutations } from '../identity';
import { createSet } from './set';
import { queryRepoWithUser } from './query-user';

describe('query with user awareness', () => {
  let app, itemsQuery, set, userIdSelector, signIn;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    const fireauth = suite.fireauth;
    app = suite.app;

    const collection = suite.firestore.collection('test');
    set = createSet(collection);

    userIdSelector = selectUserId(queryUser(fireauth));
    const driver = collection.where('id', '==', 'test-id');
    itemsQuery = queryRepoWithUser(userIdSelector, driver);

    const identityMutations = createIdentityMutations(fireauth);
    signIn = () => identityMutations.signIn(credentials[0]);
  });

  afterAll(() => app.delete());

  it('query is always empty while no user is signed in', async () => {
    const item = { id: 'test-id', name: 'test name' };
    await set(item);

    expect(itemsQuery.current).toMatchObject({});
  });

  it('query shows user data after sign in', async () => {
    await signIn();

    const item = {
      id: 'test-id',
      name: 'test name',
      user: userIdSelector.current
    };
    await set(item);

    expect(itemsQuery.current).toMatchObject({ [item.id]: item });
  });
});
