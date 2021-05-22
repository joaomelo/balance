import { initFirebaseSuiteFromEnv } from '../firebase';
import { createSet } from './set';
import { createDel } from './del';
import {
  queryStore,
  selectAllItems,
  selectActiveItems,
  selectItemById
} from './query';

describe('repository query', () => {
  let app, collection, query, set, del;

  beforeEach(async () => {
    const suite = await initFirebaseSuiteFromEnv();
    app = suite.app;
    collection = suite.firestore.collection('test');
    query = collection.where('id', '==', 'test-id');
    set = createSet(collection);
    del = createDel(collection);
  });

  afterAll(() => app.delete());

  it('keeps items updated when collection changes', async () => {
    const items = queryStore(query);
    expect(items.current).toMatchObject({});

    const item = { id: 'test-id', name: 'test name' };
    await set(item);
    expect(items.current).toMatchObject({
      'test-id': { ...item }
    });
  });

  it('selects an array of all items', async () => {
    const items = queryStore(query);
    const allItems = selectAllItems(items);
    const item = { id: 'test-id', name: 'test name' };
    await set(item);

    expect(allItems.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining(item)
      ])
    );
  });

  it('selects only active items', async () => {
    const items = queryStore(query);
    const activeItems = selectActiveItems(items);
    const item = { id: 'test-id', name: 'test name' };
    await set(item);
    await del('test-id');

    expect(activeItems.current).toEqual(
      expect.arrayContaining([])
    );
  });

  it('selects an item by id', async () => {
    const items = queryStore(query);
    const itemById = selectItemById(items, 'test-id');
    const item = { id: 'test-id', name: 'test name' };
    await set(item);

    expect(itemById.current).toMatchObject(item);
  });
});
