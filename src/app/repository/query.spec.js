import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';
import { queryRepository } from './query';

describe('query repository', () => {
  let app, collection, driver, set;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    driver = collection.where('id', '==', 'test-id');
    set = createSet(collection);
  });

  afterAll(() => app.delete());

  it('keeps items updated when collection changes', async () => {
    const itemsQuery = queryRepository(driver);
    expect(itemsQuery.current).toMatchObject({});

    const item = { id: 'test-id', name: 'test name' };
    await set(item);
    expect(itemsQuery.current).toMatchObject({
      'test-id': { ...item }
    });
  });
});
