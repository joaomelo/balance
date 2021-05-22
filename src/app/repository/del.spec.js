import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';
import { createDel } from './del';

describe('repository service module', () => {
  let app, collection, set, del;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    set = createSet(collection);
    del = createDel(collection);
  });

  afterAll(() => app.delete());

  it('can logically delete values', async () => {
    const item = { id: 'test-id', name: 'test name' };

    await set(item);
    const setDoc = await collection.doc('test-id').get();
    expect(setDoc.data()).toHaveProperty('_deleted', false);

    await del('test-id');
    const delDoc = await collection.doc('test-id').get();
    expect(delDoc.data()).toHaveProperty('_deleted', true);
  });
});
