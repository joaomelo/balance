import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';
import { queryStore } from './query';
// import { queryStore, selectItemById, selectAllItems, selectActiveItems } from './query';

describe('repository query', () => {
  let app, collection, query, set;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    query = collection.where('id', '==', 'test-id');
    set = createSet(collection);
  });

  after(() => {
    return app.delete();
  });

  it('keeps items updated when collection changes', () => {
    const items = queryStore(query);
    const empty = items.current;

    const item = { id: 'test-id', name: 'test name' };
    set(item).then(() => {
      expect(empty).to.deep.equal({});
      expect(items.current).to.deep.equal(item);
    });
  });

  // test('keeps items updated when collection changes', async () => {
  //   const items = queryStore(testQuery);
  //   expect(items.current).to.deep.equal({});

  //   const item = { id: 'test-id', name: 'test name' };
  //   const newItem = { id: 'test-id', name: 'new name' };
  //   const filter = () => ({ field: 'id', operator: '==', value: 'test-id' });

  //   await store.set(item);
  //   store.igniteQuery([filter]);
  //   await store.set(newItem);

  //   expect(spy).toHaveBeenCalledWith(expect.objectContaining({
  //     items: expect.objectContaining({
  //       'test-id': expect.objectContaining(newItem)
  //     })
  //   }));
  //   spy.mockRestore();
  // });

  // test('querying can be turned off', async () => {
  //   const spy = jest.spyOn(store, 'update');

  //   const item = { id: 'test-id', name: 'test name' };
  //   const newItem = { id: 'test-id', name: 'new name' };
  //   const filter = () => ({ field: 'id', operator: '==', value: 'test-id' });

  //   await store.set(item);
  //   store.igniteQuery([filter]);
  //   store.douseQuery();
  //   await store.set(newItem);

  //   expect(spy).toHaveBeenCalledTimes(1);
  //   spy.mockRestore();
  // });
});
