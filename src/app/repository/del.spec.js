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

  after(() => {
    return app.delete();
  });

  it('can logically delete values', () => {
    const item = { id: 'test-id', name: 'test name' };

    set(item)
      .then(() => collection.doc('test-id').get())
      .then(doc => {
        const record = doc.data();
        expect(record).to.have.property('_deleted', false);
        return del('test-id');
      })
      .then(() => collection.doc('test-id').get())
      .then(doc => {
        const record = doc.data();
        expect(record).to.have.property('_deleted', true);
      });
  });
});
