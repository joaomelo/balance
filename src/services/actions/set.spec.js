import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';

describe('repository set', () => {
  let app, collection, set;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    set = createSet(collection);
  });

  afterAll(() => app.delete());

  it('can create new items', async () => {
    const item = { id: 'test-id', name: 'test name' };

    await set(item);
    const doc = await collection.doc('test-id').get();

    expect(doc.data()).toMatchObject({
      ...item,
      _deleted: false,
      _updated: expect.anything()
    });
  });

  it('can update values', async () => {
    const item = { id: 'test-id', name: 'test name' };
    await set(item);
    const doc = await collection.doc('test-id').get();
    const record = doc.data();

    const newItem = { id: 'test-id', name: 'new test name' };
    await set(newItem);
    const newDoc = await collection.doc('test-id').get();
    const newRecord = newDoc.data();

    expect(newRecord).toMatchObject({
      ...newItem,
      _deleted: false,
      _updated: expect.anything()
    });
    expect(newRecord._updated.nanoseconds)
      .toBeGreaterThan(record._updated.nanoseconds);
  });
});
