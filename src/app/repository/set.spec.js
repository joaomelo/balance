import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';

describe('repository service module', () => {
  let app, collection, set;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    set = createSet(collection);
  });

  after(() => {
    return app.delete();
  });

  it('can set values', async () => {
    const item = { id: 'test-id', name: 'test name' };

    await set(item);
    const doc = await collection.doc('test-id').get();
    const record = doc.data();

    expect(record).to.deep.equal(item);
  });
});
